import m from 'mithril';
import h from '../h';

const adminSubscription = {
    view: function(ctrl, args) {
        const subscription = args.item;
        return m('.w-row.admin-contribution', [
            m('.fontweight-semibold.fontsize-small',
              `$${subscription.amount / 100} por mês`
             ),
            m('.fontsize-smaller.fontweight-semibold',
              `(${subscription.paid_count} mês ativo)`
             )
        ]);
    }
};

export default adminSubscription;
