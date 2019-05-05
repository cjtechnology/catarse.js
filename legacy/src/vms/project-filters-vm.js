import m from 'mithril';
import _ from 'underscore';
import moment from 'moment';
import { catarse } from '../api';

const projectFiltersVM = () => {
    const filtersVM = catarse.filtersVM,
        all = filtersVM({
            state: 'eq'
        }).state('online'),

        nearMe = filtersVM({
            near_me: 'eq',
            open_for_contributions: 'eq'
        }).open_for_contributions('true').near_me(true),

        sub = filtersVM({
            mode: 'eq'
        }).mode('sub'),

        notSub = filtersVM({
            mode: 'not.eq'
        }).mode('sub'),

        expiring = filtersVM({
            expires_at: 'lte',
            open_for_contributions: 'eq'
        }).open_for_contributions('true').expires_at(moment().add(14, 'days').format('YYYY-MM-DD')),

        recent = filtersVM({
            online_date: 'gte',
            open_for_contributions: 'eq'
        }).open_for_contributions('true').online_date(moment().subtract(5, 'days').format('YYYY-MM-DD')),

        score = filtersVM({
            score: 'gte',
            open_for_contributions: 'eq'
        }).score('1').open_for_contributions('true'),

        online = filtersVM({
            open_for_contributions: 'eq'
        }).open_for_contributions('true'),

        recommended = filtersVM({
            open_for_contributions: 'eq'
        }).open_for_contributions('true'),

        contributed_by_friends = filtersVM({
            open_for_contributions: 'eq',
            contributed_by_friends: 'eq'
        }).open_for_contributions('true').contributed_by_friends(true),

        successful = filtersVM({
            state: 'eq'
        }).state('successful'),

        finished = filtersVM({}),

        filters = {
            all: {
                title: 'All categories',
                filter: all,
                nicename: 'Popular',
                isContextual: false,
                keyName: 'all'
            },
            //recommended_1: {
            //    title: 'Recomendados para você',
            //    filter: recommended,
            //    nicename: 'Recomendados para você',
            //    isContextual: false,
            //    keyName: 'recommended_1'
            //},
            //recommended_2: {
            //    title: 'Recomendados para você',
            //    filter: recommended,
            //    nicename: 'Recomendados para você',
            //    isContextual: false,
            //    keyName: 'recommended_2'
            //},
            contributed_by_friends: {
                title: 'Friends',
                filter: contributed_by_friends,
                nicename: 'Supported by Friends',
                isContextual: false,
                keyName: 'contributed_by_friends'
            },
            recent: {
                title: 'Recent updated',
                filter: recent,
                nicename: 'Recent',
                isContextual: false,
                keyName: 'recent'
            },
            expiring: {
                title: 'Final stretch',
                filter: expiring,
                nicename: 'Final stretch',
                isContextual: false,
                keyName: 'expiring'
            },
            finished: {
                title: 'All categories',
                filter: finished,
                nicename: 'Finished',
                isContextual: false,
                keyName: 'finished'
            },
            score: {
                title: 'All categories',
                filter: score,
                nicename: 'Popular',
                isContextual: false,
                keyName: 'score'
            },
            online: {
                title: 'Online',
                filter: online,
                isContextual: false,
                keyName: 'online'
            },
            successful: {
                title: 'All categories',
                filter: successful,
                nicename: 'Funded',
                isContextual: false,
                keyName: 'successful'
            },
            not_sub: {
                title: 'Point projects',
                nicename: 'Point projects',
                filter: notSub,
                isContextual: false,
                keyName: 'not_sub',
                header_badges: ['badge-aon-h-margin', 'badge-flex-h-margin']
            },
            all_modes: {
                title: window.I18n.t("projects.explore.all_projects"),
                filter: null,
                isContextual: false,
                keyName: 'all_modes'
            },
            sub: {
                title: window.I18n.t("projects.explore.about_us"),
                nicename: window.I18n.t("projects.explore.about_us"),
                filter: sub,
                isContextual: false,
                keyName: 'sub',
                header_badges: ['badge-sub-h-margin']
            },
            near_me: {
                title: 'Next to me',
                filter: nearMe,
                isContextual: false,
                keyName: 'near_me'
            }
        };

    const setContextFilters = (contextFilters) => {
            _.map(contextFilters, filterKey => filters[filterKey].isContextual = true);

            return filters;
        },
        getContextFilters = () => _.filter(filters, filter => filter.isContextual),
        removeContextFilter = (filter) => {
            filters[filter.keyName].isContextual = false;

            return filters;
        };

    return {
        filters,
        setContextFilters,
        getContextFilters,
        removeContextFilter
    };
};

export default projectFiltersVM;
