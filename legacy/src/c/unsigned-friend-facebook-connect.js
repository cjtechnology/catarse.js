import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const UnsignedFriendFacebookConnect = {
    controller: function(args) {
        return {
            largeBg: (() => {
                if (_.isUndefined(args)) {
                    return false;
                }
                return (_.isUndefined(args.largeBg) ? false : args.largeBg);
            })()
        };
    },
    view: function(ctrl, args) {
        return m(`.w-section.section${(ctrl.largeBg ? '.bg-backs-carrosel.section-large' : '')}`, [
            m('.w-container', [
                m('.card.card-big', [
                    m('.w-row', [
                        m('.w-col.w-col-8', [
                            m('.fontsize-largest.u-marginbottom-20', 'Find amazing projects with your friends'),
                            m('.fontsize-small', 'Real Capital universe along with your Facebook network will make you discover incredible projects!')
                        ]),
                        m('.w-col.w-col-4', [
                            m('a.w-button.btn.btn-fb.btn-large.u-margintop-30.u-marginbottom-10[href="/connect-facebook"]', 'Conecte seu facebook'),
                            m('.fontsize-smallest.fontcolor-secondary.u-text-center', 'Nós nunca postaremos nada no facebook sem sua permissão')
                        ])
                    ])
                ])
            ])
        ]);
    }
};

export default UnsignedFriendFacebookConnect;
