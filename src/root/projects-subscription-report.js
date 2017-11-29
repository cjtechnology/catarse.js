import m from 'mithril';
import _ from 'underscore';
import { catarse, commonPayment } from '../api';
import models from '../models';
import h from '../h';
import loadMoreBtn from '../c/load-more-btn';
import FilterDropdown from '../c/filter-dropdown';
import projectDashboardMenu from '../c/project-dashboard-menu';
import dashboardSubscriptionCard from '../c/dashboard-subscription-card';
import projectsSubscriptionReportVM from '../vms/projects-subscription-report-vm';
import projectsContributionReportVM from '../vms/projects-contribution-report-vm';

const projectSubscriptionReport = {
    controller(args) {
        const filterVM = projectsSubscriptionReportVM,
            catarseVM = projectsContributionReportVM,
            error = m.prop(false),
            loader = m.prop(true),
            rewards = m.prop([]),
            subscriptions = commonPayment.paginationVM(models.userSubscription, 'created_at.desc', {
                Prefer: 'count=exact'
            }),
            submit = () => {
                if (filterVM.reward_external_id() === 'null') {
                    subscriptions.firstPage(filterVM.withNullParameters()).then(null);
                } else {
                    subscriptions.firstPage(filterVM.parameters()).then(null);
                }

                return false;
            },
            filterBuilder = [
                {
                    label: 'reward_filter',
                    component: FilterDropdown,
                    data: {
                        label: 'Recompensa',
                        onchange: submit,
                        name: 'reward_external_id',
                        vm: filterVM.reward_external_id,
                        wrapper_class: '.w-sub-col.w-col.w-col-3',
                        options: []
                    }
                },
                {
                    label: 'status_filter',
                    component: FilterDropdown,
                    data: {
                        label: 'Status',
                        onchange: submit,
                        name: 'status',
                        vm: filterVM.status,
                        wrapper_class: '.w-sub-col.w-col.w-col-3',
                        options: [{
                            value: '',
                            option: 'Todos'
                        },
                        {
                            value: 'active',
                            option: 'Ativa'
                        },
                        {
                            value: 'started',
                            option: 'Iniciada'
                        },
                        {
                            value: 'inactive',
                            option: 'Inativa'
                        }
                        ]
                    }
                },
                {
                    label: 'payment_filter',
                    component: FilterDropdown,
                    data: {
                        label: 'Meio de pagamento',
                        onchange: submit,
                        name: 'payment_method',
                        vm: filterVM.payment_method,
                        wrapper_class: '.w-sub-col.w-col.w-col-3',
                        options: [{
                            value: '',
                            option: 'Todos'
                        },
                        {
                            value: 'credit_card',
                            option: 'C.C'
                        },
                        {
                            value: 'boleto',
                            option: 'Boleto'
                        }
                        ]
                    }
                }

            ],
            handleError = () => {
                error(true);
                loader(false);
                m.redraw();
            },
            project = m.prop([{}]);

        catarseVM.project_id(args.project_id);

        const lReward = catarse.loaderWithToken(models.rewardDetail.getPageOptions({
            project_id: `eq.${catarseVM.project_id()}`
        }));

        lReward.load().then(rewards);
        const mapRewardsToOptions = () => {
            let options = [];
            if (!lReward()) {
                options = _.map(rewards(), r => ({
                    value: r.id,
                    option: `R$ ${h.formatNumber(r.minimum_value, 2, 3)} - ${(r.title ? r.title : r.description).substring(0, 20)}`
                }));
            }

            options.unshift({
                value: null,
                option: 'Sem recompensa'
            });

            options.unshift({
                value: '',
                option: 'Todas'
            });

            return options;
        };

        const lProject = catarse.loaderWithToken(models.projectDetail.getPageOptions({
            project_id: `eq.${catarseVM.project_id()}`
        }));

        lProject.load().then((data) => {
            filterVM.project_id(_.first(data).common_id);
            subscriptions.firstPage(filterVM.parameters()).then(() => {
                loader(false);
            }).catch(handleError);
            project(data);
        });

        return {
            filterVM,
            mapRewardsToOptions,
            filterBuilder,
            submit,
            subscriptions,
            lProject,
            project
        };
    },
    view(ctrl) {
        const subsCollection = ctrl.subscriptions.collection(),
            filterBuilder = ctrl.filterBuilder,
            statusFilter = _.findWhere(filterBuilder, {
                label: 'status_filter'
            }),
            rewardFilter = _.findWhere(filterBuilder, {
                label: 'reward_filter'
            }),
            paymentFilter = _.findWhere(filterBuilder, {
                label: 'payment_filter'
            });
        rewardFilter.data.options = ctrl.mapRewardsToOptions();
        if (!ctrl.lProject()) {
            return m('div', [
                m.component(projectDashboardMenu, {
                    project: m.prop(_.first(ctrl.project()))
                }),
                m('.dashboard-header',
                    m('.w-container',
                        m('.w-row', [
                            m('.w-col.w-col-3'),
                            m('.w-col.w-col-6',
                                m('.fontsize-larger.fontweight-semibold.lineheight-looser.u-marginbottom-30.u-text-center',
                                    'Base de assinantes'
                                )
                            ),
                            m('.w-col.w-col-3')
                        ])
                    )
                ),
                m('.divider.u-margintop-30'),
                m('.card',
                    m('.w-container',
                        m('.w-form', [
                            m('form', {
                                onsubmit: ctrl.submit
                            },
                                m('.u-margintop-20.w-row', [
                                    m('.w-col.w-col-8',
                                        m('.w-row', [
                                            m.component(statusFilter.component, statusFilter.data),
                                            m.component(rewardFilter.component, rewardFilter.data),
                                            m.component(paymentFilter.component, paymentFilter.data)
                                        ])
                                    ),
                                    m('.w-col.w-col-4', '')
                                ])
                            )
                        ])
                    )
                ),
                m('.before-footer.bg-gray.section', [
                    m('.w-container', [
                        m('div',
                            m('.w-row', [
                                m('.u-marginbottom-20.u-text-center-small-only.w-col.w-col-7',
                                    m('.w-inline-block.fontsize-base.u-marginright-10', [
                                        m('span.fontweight-semibold',
                                            ctrl.subscriptions.total()
                                        ),
                                        ' pessoas',
                                        m.trust('&nbsp;')
                                    ])
                                ),
                            ])
                        ),
                        m('.u-marginbottom-60', [
                            m('.card.card-secondary.fontsize-smallest.fontweight-semibold.lineheight-tighter.u-marginbottom-10',
                                m('.w-row', [
                                    m('.table-col.w-col.w-col-3',
                                        m('div',
                                            'Assinante'
                                        )
                                    ),
                                    m('.table-col.w-col.w-col-2',
                                        m('div',
                                            'Recompensa'
                                        )
                                    ),
                                    m('.table-col.w-col.w-col-1.u-text-center',
                                        m('div',
                                            'Apoio mensal'
                                        )
                                    ),
                                    m('.table-col.w-col.w-col-2.u-text-center',
                                        m('div',
                                            'Total apoiado'
                                        )
                                    ),
                                    m('.table-col.w-col.w-col-2.u-text-center',
                                        m('div',
                                            'Último apoio'
                                        )
                                    ),
                                    m('.table-col.w-col.w-col-2.u-text-center',
                                        m('div',
                                            'Status da Assinatura'
                                        )
                                    )
                                ])
                            ),
                            m('.fontsize-small', [
                                _.map(subsCollection, subscription =>
                                    m(dashboardSubscriptionCard, { subscription }))
                            ])
                        ])
                    ]),
                    m('.bg-gray.section',
                        m('.w-container',
                            m('.u-marginbottom-60.w-row', [
                                m(loadMoreBtn, {
                                    collection: ctrl.subscriptions,
                                    cssClass: '.w-col-push-4'
                                })
                            ])
                        )
                    )
                ])
            ]);
        }
        return m('', h.loader());
    }
};

export default projectSubscriptionReport;
