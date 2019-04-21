import m from 'mithril';
import h from '../h';

const footer = {
    view: function() {
        return m('footer.main-footer.main-footer-neg',
            [
                m('section.w-container',
                    m('.w-row',
                        [
                            m('.w-col.w-col-9',
                                m('.w-row',
                                    [
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.w-hidden-tiny',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    window.I18n.t('layouts.footer.titles.social')
                                                ),
                                                m('a.link-footer[href=\'http://facebook.com/catarse.me\']',
                                                    [
                                                        m('span.fa.fa-facebook-square.fa-lg'),
                                                        m.trust('&nbsp;&nbsp;'),
                                                        'Facebook'
                                                    ]
                                                ),
                                                m('a.link-footer[href=\'http://twitter.com/catarse\']',
                                                    [
                                                        m('span.fa.fa-twitter-square.fa-lg'),
                                                        m.trust('&nbsp;&nbsp;'),
                                                        'Twitter'
                                                    ]
                                                ),
                                                m('a.link-footer[href=\'http://instagram.com/catarse\']',
                                                    [
                                                        m('span.fa.fa-instagram.fa-lg'),
                                                        m.trust('&nbsp;&nbsp;'),
                                                        'Instagram'
                                                    ]
                                                ),
                                                m('a.link-footer[href=\'http://github.com/catarse/catarse\']',
                                                    [
                                                        m('span.fa.fa-github-square.fa-lg'),
                                                        m.trust('&nbsp;&nbsp;'),
                                                        'Github'
                                                    ]
                                                )
                                            ]
                                        ),
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.footer-full-firstcolumn',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    window.I18n.t('layouts.footer.titles.about')
                                                ),
                                                m('a.link-footer[href=\'http://suporte.catarse.me?ref=ctrse_footer/\']',
                                                    window.I18n.t('layouts.footer.links.help_support')
                                                ),
                                                h.getUser() ?
                                                    m('a.link-footer[href=\'https://suporte.catarse.me/hc/pt-br/signin?return_to=https%3A%2F%2Fsuporte.catarse.me%2Fhc%2Fpt-br%2Frequests%2Fnew&locale=19\'][target="_BLANK"]',
                                                      window.I18n.t('layouts.footer.links.contact')
                                                     )
                                                    :
                                                    m('a.link-footer[href=\'http://suporte.catarse.me/hc/pt-br/requests/new\'][target="_BLANK"]',
                                                      window.I18n.t('layouts.footer.links.contact')
                                                     )
                                            ]
                                        ),
                                        m('.w-col.w-col-4.w-col-small-4.w-col-tiny-4.footer-full-lastcolumn',
                                            [
                                                m('.footer-full-signature-text.fontsize-small',
                                                    window.I18n.t('layouts.footer.texts.make_a_campaign')
                                                ),
                                                m(`a.u-marginbottom-30.link-footer[href=\'/${window.I18n.locale}/start?ref=ctrse_footer\']`,
                                                    window.I18n.t('projects.new.page-title')
                                                ),
                                                m('.footer-full-signature-text.fontsize-small',
                                                    window.I18n.t('layouts.footer.texts.explore')
                                                ),
                                                m(`a.link-footer[href=\'/${window.I18n.locale}/explore?ref=ctrse_footer\']`,
                                                    window.I18n.t('layouts.footer.links.discover')  
                                                ),
                                                m(`a.w-hidden-tiny.link-footer[href=\'/${window.I18n.locale}/explore?filter=score&ref=ctrse_footer\']`,
                                                    window.I18n.t('layouts.footer.links.score')  
                                                ),
                                                m(`a.w-hidden-tiny.link-footer[href=\'/${window.I18n.locale}/explore?filter=online&ref=ctrse_footer\']`,
                                                    window.I18n.t('layouts.footer.links.online')  
                                                ),
                                                m(`a.w-hidden-tiny.link-footer[href=\'/${window.I18n.locale}/explore?filter=finished&ref=ctrse_footer\']`,
                                                    window.I18n.t('layouts.footer.links.finished')  
                                                )
                                            ]
                                        )
                                    ]
                                )
                            ),
                            m('.w-col.w-col-3.column-social-media-footer',
                                [
                                    m('.footer-full-signature-text.fontsize-small',
                                        window.I18n.t("layouts.footer.titles.newsletter")
                                    ),
                                    m('.w-form',
                                        m(`form[accept-charset='UTF-8'][action='${h.getNewsletterUrl()}'][id='mailee-form'][method='post']`,
                                            [
                                                m('.w-form.footer-newsletter',
                                                    m(`input.w-input.text-field.prefix[id=\'EMAIL\'][label=\'email\'][name=\'EMAIL\'][placeholder=\'${window.I18n.t("layouts.footer.texts.email")}\'][type=\'email\']`)
                                                ),
                                                m('button.w-inline-block.btn.btn-edit.postfix.btn-attached[style="padding:0;"]',
                                                    m('img.footer-news-icon[alt=\'Icon newsletter\'][src=\'/assets/catarse_bootstrap/icon-newsletter.png\']')
                                                )
                                            ]
                                        )
                                    ),
                                    m('.lineheight-loose',
                                        m(`a.link-footer-inline[href='/change_locale?locale=zh-CN']`,
                                           `${window.I18n.t('layouts.footer.locales.chinese')}  `
                                        ),
                                        m(`a.link-footer-inline[href=/change_locale?locale=en]`,
                                           `${window.I18n.t('layouts.footer.locales.english')}`
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ),
                m('.w-container',
                    m('.footer-full-copyleft',
                        [
                            m('img.u-marginbottom-20[alt=\'Logo footer\'][src=\'/assets/logo-footer.png\']'),
                            m('.lineheight-loose',
                                m('a.link-footer-inline[href=\'http://realcapital.com.au\']',
                                   ` Real Capital | ${new Date().getFullYear()} `
                                )
                            )
                        ]
                    )
                )
            ]
        );
    }
};

export default footer;
