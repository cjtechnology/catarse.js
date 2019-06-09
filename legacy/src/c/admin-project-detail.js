import m from 'mithril';
import _ from 'underscore';
import {
    catarse,
    commonAnalytics
} from '../api';
import h from '../h';
import models from '../models';
import adminInputAction from './admin-input-action';
import adminRadioAction from './admin-radio-action';
import adminExternalAction from './admin-external-action';
import projectVM from '../vms/project-vm';

const adminProjectDetail = {
    controller: function(args) {
        let bankl;
        const currentItem = m.prop(args.item);
        const project_id = args.item.project_id;
        const loadBank = () => {
            const model = models.projectAccount,
                opts = model.getRowOptions(h.idVM.id(project_id).parameters()),
                project = m.prop({});

            bankl = catarse.loaderWithToken(opts);

            if (project_id) {
                bankl.load().then(_.compose(project, _.first));
            }

            return project;
        };
        let l;
        const loadUser = () => {
            const model = models.userDetail,
                user_id = args.item.user_id,
                opts = model.getRowOptions(h.idVM.id(user_id).parameters()),
                user = m.prop({});

            l = catarse.loaderWithToken(opts);

            if (user_id) {
                l.load().then(_.compose(user, _.first));
            }

            return user;
        };

        const changeUserAction = {
            toggler: h.toggleProp(false, true),
            submit: newValue => () => {
                changeUserAction.complete(false);
                projectVM
                    .updateProject(project_id, { user_id: newValue })
                    .then(() => {
                        changeUserAction.complete(true);
                        changeUserAction.success(true);
                        changeUserAction.error(false);
                    })
                    .catch(() => {
                        changeUserAction.complete(true);
                        changeUserAction.success(true);
                        changeUserAction.error(true);
                    });
                return false;
            },
            complete: m.prop(false),
            error: m.prop(false),
            success: m.prop(false),
            newValue: m.prop('')
        };

        const contributionReport = {
            toggler: h.toggleProp(false, true)
        };

        const actionUnload = action => () => {
            action.complete(false);
            action.error(false);
            action.success(false);
            action.newValue('');
        };

        const projectSubscriberInfo = m.prop();
        const projectRevert = {
            toggler: h.toggleProp(false, true),
            loading: h.toggleProp(false, true),
            submit: () => {
                projectRevert.loading.toggle();
                m.redraw();
                m.request({
                    method: 'PUT',
                    config: h.setCsrfToken,
                    url: `/admin/projects/${project_id}/revert_or_finish`
                }).then((data) => {
                    console.log(data);
                    catarse.loaderWithToken(
                        models.adminProject.getRowOptions({project_id: `eq.${project_id}`})
                    ).load().then((response) => {
                        currentItem(response);
                        projectRevert.loading.toggle();
                        projectRevert.toggler.toggle();
                    })
                });
            }
        };

        if (args.item.mode === 'sub') {
            commonAnalytics.loaderWithToken(models.projectSubscribersInfo.postOptions({
                id: args.item.common_id
            })).load().then(projectSubscriberInfo);
        }

        return {
            user: loadUser(),
            bankAccount: loadBank(),
            subscriberInfo: projectSubscriberInfo,
            actions: {
                changeUserAction,
                projectRevert
            },
            currentItem,
            actionUnload
        };
    },
    view: function(ctrl, args) {
        const actions = ctrl.actions,
            item = ctrl.currentItem(),
            user = ctrl.user(),
            bankAccount = ctrl.bankAccount(),
            userAddress = user.address || {},
            subscriberInfo = ctrl.subscriberInfo(),
            totalSubscriptions = subscriberInfo ? subscriberInfo.total_subscriptions : 0;

        return m('#admin-contribution-detail-box', [
            m('.divider.u-margintop-20.u-marginbottom-20'),
            m('.w-row.u-marginbottom-30', [
                m('.w-col.w-col-2', [
                    m('button.btn.btn-small.btn-terciary', {
                        onclick: ctrl.actions.changeUserAction.toggler.toggle
                    }, 'Change director'),
                    (ctrl.actions.changeUserAction.toggler() ? 
                        m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10', {
                            config: ctrl.actionUnload(ctrl.actions.changeUserAction)
                        }, [
                            m('form.w-form', {
                                onsubmit: ctrl.actions.changeUserAction.submit
                            }, (!ctrl.actions.changeUserAction.complete()) ? [
                                m('label', 'Id of the new director:'),
                                m('input.w-input.text-field[type="tel"][placeholder="ex: 239049"]', {
                                    onchange: m.withAttr('value', ctrl.actions.changeUserAction.newValue),
                                    value: ctrl.actions.changeUserAction.newValue()
                                }),
                                m('input.w-button.btn.btn-small[type="submit"][value="Transfer"]', {
                                    onclick: ctrl.actions.changeUserAction.submit(ctrl.actions.changeUserAction.newValue())
                                })
                            ] : (!ctrl.actions.changeUserAction.error()) ? [
                                m('.w-form-done[style="display:block;"]', [
                                    m('p', 'Successfully transferred user')
                                ])
                            ] : [
                                m('.w-form-error[style="display:block;"]', [
                                    m('p', 'There was a problem with the request. Verify that the user who will receive the project has valid data.')
                                ])
                            ])
                        ]) : '')
                ]),
                m('.w-col.w-col-2', [
                    (item.mode === 'sub' ?
                        m('a.btn.btn-small.btn-terciary', { href: `/projects/${item.project_id}/subscriptions_report` }, 'Subscriber Base')
                        : m('a.btn.btn-small.btn-terciary', { href: `/projects/${item.project_id}/contributions_report` }, 'Support report'))
                ]),
                (item.mode === 'sub' && item.state === 'online' ?
                    m('.w-col.w-col-3', [
                        m('button.btn.btn-small.btn-terciary', {
                            onclick: ctrl.actions.projectRevert.toggler.toggle
                        }, (totalSubscriptions > 0 ? 'Encerrar projeto' : 'Virar projeto para Draft')),
                        (ctrl.actions.projectRevert.toggler() ? 
                            (ctrl.actions.projectRevert.loading() ? h.loader()
                                : m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10', [
                                    m('form.w-form', {
                                        onsubmit: ctrl.actions.projectRevert.submit
                                    }, [
                                        m('label', (totalSubscriptions > 0 ? 'When you close this project, it will be converted to the FINALIZED (Flex) status and your signatures will be transformed into CANCELED. Are you sure you want to close this project?' : 'Are you sure you want to turn this project into a Draft?')),
                                        m('input.w-button.btn.btn-small[type="submit"]', {
                                            value: (totalSubscriptions > 0 ? 'Close project' : 'Turn project to Draft' )
                                        })
                                    ])
                                ])) : '')
                    ]) : '')
            ]),
            m('.w-row.card.card-terciary.u-radius', [
                m('.w-col.w-col-4', [
                    m('.fontsize-smaller.fontweight-semibold.lineheight-tighter.u-marginbottom-20',
                        'Project Details'
                    ),
                    m('.fontsize-smallest.fontweight-semibold.u-marginbottom-20',
                        `realcapital.me/${item.permalink}`
                    ),
                    m('.fontsize-smallest.lineheight-looser.u-marginbottom-20', [
                        m('span.fontweight-semibold',
                            'Goal:'
                        ),
                        ` $ ${h.formatNumber(item.goal, 2, 3)}\ `,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Reached:'
                        ),
                        ` $ ${h.formatNumber(item.pledged, 2, 3)}\ `
                    ]),
                    m('.fontsize-smallest.lineheight-looser', [
                        m('span.fontweight-semibold',
                            'Start: '
                        ),
                        h.momentify(item.project_online_date, 'DD/MM/YYYY, HH:mm'),
                        m('br'),
                        m('span.fontweight-semibold',
                            'Term: '
                        ),
                        h.momentify(item.project_expires_at, 'DD/MM/YYYY, HH:mm'),
                        m('br'),
                        m('span.fontweight-semibold',
                            'Last update: '
                        ),
                        h.momentify(item.updated_at, 'DD/MM/YYYY, HH:mm'),
                        m('br'),
                        m('span.fontweight-semibold',
                            'News: '
                        ),
                        item.posts_count,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Latest novelty: '
                        ),
                        h.momentify(item.last_post, 'DD/MM/YYYY, HH:mm')
                    ])
                ]),
                m('.w-col.w-col-4', [
                    m('.fontsize-smaller.fontweight-semibold.lineheight-tighter.u-marginbottom-20',
                        'Bank data'
                    ),
                    m('.fontsize-smallest.lineheight-looser', [
                        m('span.fontweight-semibold',
                            'Bank: '
                        ),
                        bankAccount.bank_name,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Agency: '
                        ),
                        `${bankAccount.agency}-${bankAccount.agency_digit}`,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Account: '
                        ),
                        `${bankAccount.account}-${bankAccount.account_digit}`,
                        m('br'),
                        bankAccount.account_type,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Name: '
                        ),
                        bankAccount.owner_name,
                        m('br'),
                        m('span.fontweight-semibold',
                            'CPF: '
                        ),
                        bankAccount.owner_document
                    ])
                ]),
                m('.w-col.w-col-4', [
                    m('.fontsize-smaller.fontweight-semibold.lineheight-tighter.u-marginbottom-20',
                        'Detalhes do realizador'
                    ),
                    m('.fontsize-smallest.lineheight-looser.u-marginbottom-20', [
                        m('span.fontweight-semibold',
                            'Name: '
                        ),
                        user.name,
                        m('br'),
                        m('span.fontweight-semibold',
                            'CPF: '
                        ),
                        user.owner_document,
                        m('br'),
                        m('span.fontweight-semibold',
                            'State registration: '
                        ),
                        user.state_inscription,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Email: '
                        ),
                        user.email,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Address: '
                        ),
                        m.trust('&nbsp;'),
                        ` ${userAddress.address_street}, ${userAddress.address_number} ${userAddress.address_complement} - ${userAddress.address_city} - ${userAddress.address_state} ${userAddress.address_zip_code}`,
                        m('br'),
                        m('span.fontweight-semibold',
                            'Telephone:'
                        ),
                        userAddress.phone_number
                    ]),
                    m('.fontsize-smallest.lineheight-looser', [
                        `${user.total_published_projects} created projects `,
                        m('br'),
                        m.trust('&nbsp;'),
                        m('br')
                    ])
                ])
            ])
        ]);
    }
};

export default adminProjectDetail;
