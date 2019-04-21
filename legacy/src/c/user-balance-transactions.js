import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import models from '../models';
import userBalanceTransactionRow from './user-balance-transaction-row';

const I18nScope = _.partial(h.i18nScope, 'users.balance');

const userBalanceTransactions = {
    controller: function(args) {
        args.balanceTransactionManager.load();

        return {
            list: args.balanceTransactionManager.list
        };
    },
    view: function(ctrl, args) {
        const list = ctrl.list;

        return m('.w-section.section.card-terciary.before-footer.balance-transactions-area', [
            m('.w-container', [
                m('.u-marginbottom-20', m('.fontsize-base.fontweight-semibold', I18n.t('activities_group', I18nScope())))
            ].concat(
                _.map(list.collection(), (item, index) => m.component(userBalanceTransactionRow, { item, index })))
            ),
            m('.container', [
                m('.w-row.u-margintop-40', [
                    m('.w-col.w-col-2.w-col-push-5', [
                        !list.isLoading() ? (
                            list.isLastPage() ? '' : m('button#load-more.btn.btn-medium.btn-terciary', {
                                onclick: list.nextPage
                            }, window.I18n.t("shared.load_more"))
                        ) :
                        h.loader()
                    ])
                ])
            ])
        ]);
    }
};

export default userBalanceTransactions;
