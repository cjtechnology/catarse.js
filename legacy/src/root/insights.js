import m from 'mithril';
import { catarse, commonAnalytics } from '../api';
import _ from 'underscore';
import h from '../h';
import models from '../models';
import projectInsights from '../c/project-insights';
import projectInsightsSub from '../c/project-insights-sub';

const insights = {
    controller: function(args) {
        const filtersVM = catarse.filtersVM({
                project_id: 'eq'
            }),
            projectDetails = m.prop([]),
            subscribersDetails = m.prop(),
            load = m.prop(false),
            loader = catarse.loaderWithToken,
            isProjectNotLoader = m.prop(true),
            setProjectId = () => {
                try {
                    const project_id = m.route.param('project_id');

                    filtersVM.project_id(project_id);
                } catch (e) {
                    filtersVM.project_id(args.root.getAttribute('data-id'));
                }
            };

        setProjectId();
        const l = loader(models.projectDetail.getRowOptions(filtersVM.parameters()));

        l.load().then((data) => {
            projectDetails(data);
            if (_.first(data).mode === 'sub') {
                const l2 = commonAnalytics.loaderWithToken(models.projectSubscribersInfo.postOptions({
                    id: _.first(data).common_id
                }));
                l2.load().then((subData) => { 
                    subscribersDetails(subData); 
                    load(true); 
                    isProjectNotLoader(false);
                });
            }
            else {
                isProjectNotLoader(false);
            }
        });
        return {
            l,
            load,
            filtersVM,
            subscribersDetails,
            projectDetails,
            isProjectNotLoader
        };
    },
    view: function(ctrl, args) {
        const project = _.first(ctrl.projectDetails()) || {
                user: {
                    name: 'Director'
                }
            },
            subscribersDetails = ctrl.subscribersDetails() || {
                amount_paid_for_valid_period: 0,
                total_subscriptions: 0,
                total_subscribers: 0
            };

        if (!ctrl.l()) {
            project.user.name = project.user.name || 'Director';
        }

        return m('.project-insights', ctrl.isProjectNotLoader() ? h.loader() : (
            project.mode === 'sub' ?
                (
                    ctrl.load() ?
                    m(projectInsightsSub, {
                        args,
                        subscribersDetails,
                        project,
                        l: ctrl.isProjectNotLoader,
                        filtersVM: ctrl.filtersVM
                    }) : '' 
                )
                    :
                (
                    m(projectInsights, {
                        args,
                        project,
                        l: ctrl.isProjectNotLoader,
                        filtersVM: ctrl.filtersVM
                    })
                )
        ));
    }
};

export default insights;
