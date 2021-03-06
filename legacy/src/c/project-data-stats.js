/**
 * window.c.ProjectDataStats component
 * render a row with project stats info like:
 * state / total_contributions / total_pledged / elapsed | remaning time
 *
 * Example:
 * m.component(c.ProjectDataStats, {project: project})
 * */
import m from 'mithril';
import _ from 'underscore';
import h from '../h';

const projectDataStats = {
    view: function(ctrl, args) {
        const project = args.project(),
            visitorsTotal = args.visitorsTotal(),
            statusTextObj = h.projectStateTextClass(project.state, project.has_cancelation_request),
            remainingTextObj = h.translatedTime(project.remaining_time),
            elapsedTextObj = h.translatedTime(project.elapsed_time);


        return m('', [
            m('.w-row.u-marginbottom-60.u-margintop-30.u-text-center', [
                m('.w-col.w-col-2'),
                m('.w-col.w-col-4', [
                    m('.fontsize-large', [
                        m('span.fontcolor-secondary', 'Status: '),
                        m('span', { class: statusTextObj.cssClass }, statusTextObj.text)
                    ])
                ]),
                m('.w-col.w-col-4', [
                    m('.fontsize-large.fontweight-semibold', [
                        m('span.fa.fa-clock-o'),
                        (_.isNull(project.expires_at) ?
                            ` Started there ${elapsedTextObj.total} ${elapsedTextObj.unit}`
                            :
                            ` ${remainingTextObj.total} ${remainingTextObj.unit} ${(remainingTextObj.total > 1 ? 'remaining' : 'remaining')}`
                        )
                    ])
                ]),
                m('.w-col.w-col-2')
            ]),
            m('.card.medium.u-marginbottom-60.u-radius.u-text-center', { style: { 'white-space': 'nowrap' } }, [
                m('.w-row', [
                    m('.w-col.w-col-6', [
                        m('.w-row.u-marginbottom-30.u-margintop-30', [
                            m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4', [
                                m('.fontsize-larger.fontweight-semibold', `${visitorsTotal}`),
                                'Visitors'
                            ]),
                            m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4', [
                                m('.bg-triangle-funnel.fontcolor-secondary.fontsize-base', `${h.formatNumber((project.total_contributors / visitorsTotal * 100 || 0), 2)}%`)
                            ]),
                            m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4', [
                                m('.fontsize-larger.fontweight-semibold', `${project.total_contributors}`),
                                'Supporters'
                            ])
                        ])
                    ]),
                    m('.w-col.w-col-6', [
                        m('.w-row.u-marginbottom-30.u-margintop-30', [
                            m('.w-col.w-col-9.w-col-small-6.w-col-tiny-6', [
                                m('.fontsize-larger.fontweight-semibold', `$ ${h.formatNumber(project.pledged, 2)}`),
                                'Collected'
                            ]),
                            m('.w-col.w-col-3.w-col-small-6.w-col-tiny-6', [
                                m('.fontsize-larger.fontweight-semibold', `${h.formatNumber(project.progress, 2)}%`),
                                'from Meta'
                            ])
                        ])
                    ])
                ]),
                m('.fontcolor-secondary.fontsize-smallest.u-margintop-20', [
                    'Data may take up to 24 hours to update.',
                    m('a.alt-link', { href: '#', target: '_blank' }, ' know more'),
                    '.'
                ])
            ])
        ]);
    }
};

export default projectDataStats;
