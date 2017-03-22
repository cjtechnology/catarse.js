import m from 'mithril';
import _ from 'underscore';
import models from '../models';
import postgrest from 'mithril-postgrest';
import projectVM from './project-vm';
import railsErrorsVM from './rails-errors-vm';
import h from '../h';
import generateErrorInstance from '../error';

const e = generateErrorInstance();

const fields = {
    about_html: m.prop('')
};

const fillFields = (data) => {
    fields.about_html(data.about_html || '');
};

const updateProject = (project_id) => {
    const projectData = {
        about_html: fields.about_html()
    };

    return projectVM.updateProject(project_id, projectData);
};

const projectDescriptionVM = {
    fields,
    fillFields,
    updateProject,
    e
};

export default projectDescriptionVM;

