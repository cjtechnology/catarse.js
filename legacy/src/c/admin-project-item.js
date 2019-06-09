import m from 'mithril';
import h from '../h';
import progressMeter from './progress-meter';
import userVM from '../vms/user-vm';
import projectVM from '../vms/project-vm';

const adminProjectItem = {
    controller: function(args) {
        const project = args.item,
            recommended = h.toggleProp(project.recommended, !project.recommended),
            toggleRecommend = () => {
                projectVM.updateProject(project.project_id, { recommended: !recommended() }).then(recommended.toggle);
            };

        return {
            project,
            toggleRecommend,
            recommended
        };
    },
    view: function(ctrl) {
        const project = ctrl.project,
            recommended = ctrl.recommended;
        return m('.w-row', [
            m('.w-col.w-col-4',
                m('.w-row', [
                    m('.w-col.w-col-2',
                        m('a.btn-star.fa.fa-lg.fa-star.w-inline-block', { onclick: () => { ctrl.toggleRecommend(); }, class: recommended() ? 'selected' : '' })
                    ),
                    m('.w-col.w-col-10',
                        m('.w-row', [
                            m('.u-marginbottom-10.w-col.w-col-3.w-col-small-3',
                                m(`img.thumb-project.u-radius[src=${project.project_img}][width=50]`)
                            ),
                            m('.w-col.w-col-9.w-col-small-9', [
                                m(`a.alt-link.fontsize-smaller.fontweight-semibold.lineheight-tighter.u-marginbottom-10[href='/${project.permalink}'][target='_blank']`,
                                    project.project_name
                                ),
                                m('.fontcolor-secondary.fontsize-smallest.fontweight-semibold',
                                    project.category_name
                                )
                            ])
                        ])
                    )
                ])
            ),
            m('.admin-project-meter.w-col.w-col-4', [
                m('.w-row', [
                    m('.w-col.w-col-4',
                        m('.fontsize-smaller.fontweight-semibold.text-success',
                            project.state
                        )
                    ),
                    m('.u-text-center-small-only.w-clearfix.w-col.w-col-8',
                        m('.fontsize-smaller.u-right',
                            `${h.momentify(project.project_online_date)} a ${h.momentify(project.project_expires_at)}`
                        )
                    )
                ]),
                m('.u-marginbottom-10',
                    m(progressMeter, { project, progress: project.progress })
                ),
                m('.w-row', [
                    m('.w-col.w-col-4',
                        m('.fontsize-smaller',
                            `${project.progress.toFixed(2)}%`
                        )
                    ),
                    m('.u-text-center-small-only.w-clearfix.w-col.w-col-8',
                        m('.fontsize-smaller.u-right',
                            `$${project.pledged} in $${project.goal}`
                        )
                    )
                ])
            ]),
            m('.w-col.w-col-4',
                m('.w-row', [
                    m('.w-col.w-col-2',
                        m(`img.user-avatar[src='${userVM.displayImage({ profile_img_thumbnail: project.profile_img_thumbnail })}']`)
                    ),
                    m('.w-col.w-col-10', [
                        m('.fontsize-smaller.fontweight-semibold.lineheight-tighter',
                            project.owner_name
                        ),
                        m('.fontcolor-secondary.fontsize-smallest.u-marginbottom-10',
                            project.email
                        ),
                        m('.fontcolor-secondary.fontsize-smallest',
                            `${project.total_published} projetos criados`
                        ),
                        m('.fontcolor-secondary.fontsize-smallest',
                            'Has not yet supported projects'
                        )
                    ])
                ])
            )
        ]);
    }
};

export default adminProjectItem;
