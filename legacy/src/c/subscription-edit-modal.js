import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const I18nScope = _.partial(h.i18nScope, 'projects.contributions.edit');
const I18nIntScope = _.partial(h.i18nScope, 'projects.contributions.edit_international');
const paymentBadge = paymentMethod => paymentMethod === 'credit_card'
        ? [m('span.fa.fa-credit-card'), ' Cartão de Crédito']
        : [m('span.fa.fa-barcode'), ' Boleto Bancário'];

const subscriptionEditModal = {
    controller: function(args) {
        const isLongDescription = reward => reward.description && reward.description.length > 110;
        const scope = attr => args.args.vm.isInternational()
                   ? I18nIntScope(attr)
                   : I18nScope(attr);

        return {
            isLongDescription,
            toggleDescription: h.toggleProp(false, true),
            scope
        };
    },
    view: function(ctrl, args) {
        const vmIsLoading = args.vm.isLoading;
        const newSubscription = args.args;
        const oldSubscription = args.args.oldSubscription;

        return newSubscription && oldSubscription ? m('.modal-backdrop',
            m('.modal-dialog-outer',
                m('.modal-dialog-inner.modal-dialog-small',
                    [
                        m('button.modal-close.fa.fa-close.fa-lg.w-inline-block', { onclick: () => {
                            vmIsLoading(false);
                            args.showModal(false);
                        } }),
                        m('.modal-dialog-header',
                            m('.fontsize-large.u-text-center',
                                'Confirme suas alterações'
                            )
                        ),
                        m('.modal-dialog-content',
                            [
                                m('.u-marginbottom-10',
                                    [
                                        m('.fontsize-smaller.fontcolor-secondary',
                                            'Recompensa'
                                        ),
                                        m('div',
                                            [
                                                m('.fontsize-smallest.fontweight-semibold',
                                                    {
                                                        class: ctrl.isLongDescription(newSubscription.reward())
                                                            ? ctrl.toggleDescription()
                                                                ? 'extended'
                                                                : ''
                                                            : 'extended'
                                                    },
                                                    newSubscription.reward().title
                                                ),
                                                m('.fontsize-smallest.fontcolor-secondary',
                                                    newSubscription.reward().description
                                                        ? newSubscription.reward().description
                                                        : m.trust(
                                                            window.I18n.t('selected_reward.review_without_reward_html',
                                                                ctrl.scope(
                                                                    _.extend({
                                                                        value: Number(newSubscription.value).toFixed()
                                                                    })
                                                                )
                                                            )
                                                        )
                                                ),
                                                ctrl.isLongDescription(newSubscription.reward())
                                                    ? m('a.link-more.link-hidden[href="#"]', {
                                                        onclick: ctrl.toggleDescription.toggle
                                                    },
                                                        ['mais', m('span.fa.fa-angle-down')]
                                                    ) : ''
                                            ]
                                        )
                                    ]
                                ),
                                m('.divider.u-marginbottom-10'),
                                m('.u-marginbottom-10',
                                  oldSubscription().checkout_data
                                  && oldSubscription().checkout_data.amount == newSubscription.value
                                    ? ''
                                    : [
                                        m('.fontsize-smaller.fontcolor-secondary',
                                            'Valor da assinatura'
                                        ),
                                        m('.fontsize-large',
                                            [
                                                m('span.fontcolor-terciary', `R$${oldSubscription().checkout_data ? oldSubscription().checkout_data.amount / 100 : ''} `),
                                                m('span.fa.fa-angle-right.fontcolor-terciary'),
                                                ` R$${newSubscription.value}`])
                                    ]
                                ),
                                m('.divider.u-marginbottom-10'),
                                m('.fontsize-smaller.fontcolor-secondary',
                                    'Pagamento'
                                ),
                                m('.w-hidden-small.w-hidden-tiny',
                                    [
                                        oldSubscription().payment_method === args.paymentMethod
                                            ? ''
                                            : m('.fontsize-large.u-marginbottom-10',
                                                [
                                                    m('span.fontcolor-terciary',
                                                      [paymentBadge(oldSubscription().checkout_data ? oldSubscription().checkout_data.payment_method : ''), ' ']
                                                    ),
                                                    m('span.fa.fa-angle-right.fontcolor-terciary'),
                                                    [' ', paymentBadge(args.paymentMethod)]
                                                ]
                                            ),
                                        m('.fontsize-smaller',
                                            [
                                                m('span.fontweight-semibold',
                                                    [
                                                        m('span.fa.fa-money.text-success'),
                                                        ' Cobrança hoje: '
                                                    ]
                                                ),
                                                'None'
                                            ]
                                        ),
                                        m('.fontsize-smaller.u-marginbottom-10',
                                            [
                                                m('span.fontweight-semibold',
                                                    [
                                                        m('span.fa.fa-calendar-o.text-success'),
                                                        ' Próxima cobrança:'
                                                    ]
                                                ),
                                                `${h.momentify(oldSubscription().next_charge_at || Date.now())} no valor de R$${newSubscription.value}`
                                            ]
                                        )
                                    ]
                                ),
                                m('.modal-dialog-nav-bottom',
                                    m('.w-row',
                                        [
                                            m('.w-col.w-col-2.w-col-push-2'),
                                            m('.u-text-center.w-col.w-col-4',
                                                m('button.btn.btn-large.u-marginbottom-20', {
                                                    onclick: () => {
                                                        args.confirm(true);
                                                        args.showModal(false);
                                                        args.pay();
                                                    }
                                                },
                                                    'Confirmar'
                                                )
                                            ),
                                            m('.w-col.w-col-4',
                                                m('button.btn.btn-large.u-marginbottom-20.btn-terciary.btn-no-border', { onclick: () => {
                                                    vmIsLoading(false);
                                                    args.showModal(false);
                                                } },
                                                    'Cancelar'
                                                )
                                            )
                                        ]
                                    )
                                )
                            ]
                        )
                    ]
                )
            )
        ) : m('div', '');
    }
};

export default subscriptionEditModal;
