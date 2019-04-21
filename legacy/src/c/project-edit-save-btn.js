import m from 'mithril';
import h from '../h';

const projectEditSaveBtn = {
    view: function(ctrl, args) {
        return m('.w-section.save-draft-btn-section', {
            style: (args.hideMarginLeft ? { 'margin-left': 0 } : '')
        }, [
            m('.w-row', [
                m('.w-col.w-col-4.w-col-push-4',
                  (args.loading() ? h.loader() : [
                      m('input[id="anchor"][name="anchor"][type="hidden"][value="about_me"]'),
                      m(`input.btn.btn.btn-large[name="commit"][type="submit"][value="${window.I18n.t('shared.save_text')}"]`, {
                          onclick: args.onSubmit
                      })
                  ])
                 ),
                m('.w-col.w-col-4')
            ])
        ]);
    }
};

export default projectEditSaveBtn;
