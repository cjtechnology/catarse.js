import m from 'mithril';
import _ from 'underscore';
import userVM from '../vms/user-vm';
import h from '../h';
import models from '../models';
import { catarse } from '../api';

const menuProfile = {
    controller: function(args) {
        const contributedProjects = m.prop(),
            latestProjects = m.prop([]),
            userDetails = m.prop({}),
            user_id = args.user.user_id,
            userBalance = m.prop(0),
            userIdVM = catarse.filtersVM({ user_id: 'eq' });

        const userName = () => {
            const name = userVM.displayName(userDetails());
            if (name && !_.isEmpty(name)) {
                return _.first(name.split(' '));
            }

            return '';
        };

        userVM.fetchUser(user_id, true, userDetails);

        userIdVM.user_id(user_id);
        models.balance.getRowWithToken(userIdVM.parameters()).then((result) => {
            const data = _.first(result) || { amount: 0, user_id };
            userBalance(data.amount);
        });

        return {
            contributedProjects,
            latestProjects,
            userDetails,
            userName,
            toggleMenu: h.toggleProp(false, true),
            userBalance
        };
    },
    view: function(ctrl, args) {
        const user = ctrl.userDetails();

        return m('.w-dropdown.user-profile',
            [
                m('.w-dropdown-toggle.dropdown-toggle.w-clearfix[id=\'user-menu\']',
                    {
                        onclick: ctrl.toggleMenu.toggle
                    },
                    [
                        m('.user-name-menu', [
                            m('.fontsize-smaller.lineheight-tightest.text-align-right', ctrl.userName()),
                            (ctrl.userBalance() > 0 ? m('.fontsize-smallest.fontweight-semibold.text-success', `R$ ${h.formatNumber(ctrl.userBalance(), 2, 3)}`) : '')

                        ]),
                        m(`img.user-avatar[alt='Thumbnail - ${user.name}'][height='40'][src='${h.useAvatarOrDefault(user.profile_img_thumbnail)}'][width='40']`)
                    ]
                ),
                ctrl.toggleMenu() ? m('nav.w-dropdown-list.dropdown-list.user-menu.w--open[id=\'user-menu-dropdown\']', { style: 'display:block;' },
                    [
                        m('.w-row',
                            [
                                m('.w-col.w-col-12',
                                    [
                                        m('.fontweight-semibold.fontsize-smaller.u-marginbottom-10',
                                            window.I18n.t("shared.menus.user.contributions_history")
                                        ),
                                        m('ul.w-list-unstyled.u-marginbottom-20',
                                            [
                                                m('li.lineheight-looser',
                                                  m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#balance']`,
                                                    m('span', [
                                                        `${window.I18n.t("users.balance.totals")} `,
                                                        (ctrl.userBalance() > 0 ? m('span.fontcolor-secondary',
                                                          `R$ ${h.formatNumber(ctrl.userBalance(), 2, 3)}`) : ''),
                                                    ])
                                                   )
                                                 ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#contributions']`,
                                                        window.I18n.t("shared.menus.user.contributions_history_nav")
                                                    )
                                                ),
                                                m('li.lineheight-looser',
                                                  m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#projects']`,
                                                    window.I18n.t("shared.menus.user.projects_created")
                                                   )
                                                 )
                                            ]
                                        ),
                                        m('.fontweight-semibold.fontsize-smaller.u-marginbottom-10',
                                            window.I18n.t("shared.menus.user.settings")
                                        ),
                                        m('ul.w-list-unstyled.u-marginbottom-20',
                                            [
                                                m('li.lineheight-looser',
                                                  m('a.alt-link.fontsize-smaller[href=\'/connect-facebook/\']',
                                                    window.I18n.t("shared.menus.user.find_friends")
                                                   ),
                                                 ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#about_me']`,
                                                      window.I18n.t("shared.menus.user.about")
                                                    )
                                                ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#notifications']`,
                                                        window.I18n.t("shared.menus.user.notifications")
                                                    )
                                                ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href='/${window.I18n.locale}/users/${user.id}/edit#settings']`,
                                                      window.I18n.t("shared.menus.user.access_address")
                                                    )
                                                )
                                            ]
                                        ),
                                        m('.divider.u-marginbottom-20'),
                                        args.user.is_admin_role ? m('.fontweight-semibold.fontsize-smaller.u-marginbottom-10',
                                            'Admin'
                                        ) : '',
                                        args.user.is_admin_role ? m('ul.w-list-unstyled.u-marginbottom-20',
                                            [
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin#/users\']`,
                                                      window.I18n.t("admin.users.index.menu")
                                                    )
                                                ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin\']`,
                                                        window.I18n.t("admin.statistics.index.total_contributions")
                                                    )
                                                ),
                                                // m('li.lineheight-looser',
                                                //   m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin#/balance-transfers\']`,
                                                //     'Saques'
                                                //    )
                                                //  ),
                                                // m('li.lineheight-looser',
                                                //     m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/admin/financials\']`,
                                                //       window.I18n.t("admin.statistics.index.menu")
                                                //     )
                                                // ),
                                                m('li.lineheight-looser',
                                                    m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin#/projects\']`,
                                                      window.I18n.t("admin.projects.index.menu")
                                                    )
                                                ),
                                                m('li.lineheight-looser',
                                                  m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin#/subscriptions\']`,
                                                    'Admin subscriptions'
                                                   )
                                                 ),
                                                m('li.lineheight-looser',
                                                  m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/new-admin#/notifications\']`,
                                                    'Admin notifications'
                                                   )
                                                ),
                                                // m('li.lineheight-looser',
                                                //     m(`a.alt-link.fontsize-smaller[href=\'/${window.I18n.locale}/dbhero\']`,
                                                //         'Dataclips'
                                                //     )
                                                // )
                                            ]
                                        ) : '',
                                        m('.fontsize-mini', `${window.I18n.t("shared.menus.user.your_email")}`),
                                        m('.fontsize-smallest.u-marginbottom-20', [
                                            m('span.fontweight-semibold', `${user.email} `),
                                            m(`a.alt-link[href='/${window.I18n.locale}/users/${user.id}/edit#about_me']`, `${window.I18n.t("shared.menus.user.update_email")}`)
                                        ]),
                                        m('.divider.u-marginbottom-20'),
                                        m(`a.alt-link[href=\'/${window.I18n.locale}/logout\']`,
                                            window.I18n.t("shared.header_channel.logout")
                                        )
                                    ]
                                ),
                                // m(`.w-col.w-col-4.w-hidden-small.w-hidden-tiny`,
                                //    [
                                //        m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                //            `Projetos apoiados`
                                //        ),
                                //        m(`ul.w-list-unstyled.u-marginbottom-20`, ctrl.contributedProjects() ?
                                //            _.isEmpty(ctrl.contributedProjects) ? 'Nenhum projeto.' :
                                //            m.component(quickProjectList, {
                                //                projects: m.prop(_.map(ctrl.contributedProjects(), (contribution) => {
                                //                    return {
                                //                        project_id: contribution.project_id,
                                //                        project_user_id: contribution.project_user_id,
                                //                        thumb_image: contribution.project_img,
                                //                        video_cover_image: contribution.project_img,
                                //                        permalink: contribution.permalink,
                                //                        name: contribution.project_name
                                //                    };
                                //                })),
                                //                loadMoreHref: '/${window.I18n.locale}/users/${user.id}/edit#contributions',
                                //                ref: 'user_menu_my_contributions'
                                //            }) : 'carregando...'
                                //        )
                                //    ]
                                // ),
                                // m(`.w-col.w-col-4.w-hidden-small.w-hidden-tiny`,
                                //    [
                                //        m(`.fontweight-semibold.fontsize-smaller.u-marginbottom-10`,
                                //            `Projetos criados`
                                //        ),
                                //        m(`ul.w-list-unstyled.u-marginbottom-20`, ctrl.latestProjects() ?
                                //            _.isEmpty(ctrl.latestProjects) ? 'Nenhum projeto.' :
                                //            m.component(quickProjectList, {
                                //                projects: ctrl.latestProjects,
                                //                loadMoreHref: '/${window.I18n.locale}/users/${user.id}/edit#contributions',
                                //                ref: 'user_menu_my_projects'
                                //            }) : 'carregando...'
                                //        )
                                //    ]
                                // )
                            ]
                        )
                    ]
                ) : ''
            ]
        );
    }
};

export default menuProfile;
