import m from 'mithril';
import h from '../h';

const aonTerms = (project, expiresAt) => [
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '1/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'What you can and can not change on the project page as of the post?')
        ]),
        m('div', [
            m('span.fontweight-semibold', 'You can not change'), `:  the identity of the person responsible for the project (Name / CPF or Social Reason / CNPJ), the financing modality, project title, project URL, project category, collection goal, chosen deadline and rewards where there are support already done.`,
            m('br'), m('br'),
            m('span.fontweight-semibold', 'You can change'), ': the main video of the campaign, the content of the description, the project image, the phrase of effect, the rewards where there are no supports made, in addition to adding new rewards during the collection'
        ])
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '2/9'),
            ' ',
            m('span.fontweight-semibold', ' Rules of the All-or-nothing mode')
        ]),
        m('div', ['You chose the all-or-nothing campaign. In this way, you will only receive the funds raised ', m('span.fontweight-semibold', 'if it reaches or exceeds the collection goal'), '. Otherwise, all of your supporters will be reimbursed. You will be responsible for delivering the rewards offered if your project reaches the collection goal.'])
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '3/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Goal of collection')
        ]),
        m('div', 'The goal can not be changed after the project has been published.'),

    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '4/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Rates')
        ]),
        m('div', [
            'Cobramos 13% sobre o ',
            m('span.fontweight-semibold', 'valor total arrecadado'),
            ' pelo seu projeto caso ele atinja ou supere a meta dentro do prazo da campanha. Se o projeto não atingir a meta, nenhuma taxa será cobrada.',
            m('span.fontweight-semibold')
        ])
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '5/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Prazo da campanha')
        ]),
        m('div', `Seu projeto estará em arrecadação no Catarse até o dia ${h.momentify(expiresAt)} às 23h59min59s. Este prazo não poderá ser alterado após a publicação do projeto.`)
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '6/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Regras do repasse e reembolso'),
            m('div', [
                m.trust('Quando o prazo do seu projeto chegar ao fim, você deverá inscrever e confirmar seus dados bancários. Você poderá alterar o Banco, Conta e a Agência <strong>somente se a nova conta cadastrada for de sua titularidade</strong>. Após essa confirmação, o Catarse depositará o valor arrecadado, já descontada a taxa, na sua conta em 10 dias úteis. Caso o projeto não atinja 100% da meta dentro do prazo, o Catarse irá reembolsar os apoiadores. <a href="http://suporte.catarse.me/hc/pt-br/articles/202365507" target="blank">Saiba mais sobre o processo de reembolso</a>')
            ])
        ]),
        m('div', '')
    ]),


    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '7/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Responsabilidade do Catarse')
        ]), [m('div', [m('span.fontweight-semibold'), m('span.fontweight-semibold', 'O Catarse é responsável:'), ' pelo desenvolvimento tecnológico da plataforma, atendimento de dúvidas e problemas (tanto de apoiadores quanto de realizadores), por hospedar o projeto na plataforma e por garantir a segurança das transações financeiras.\ ', m('br'), m('br'), m('span.fontweight-semibold', 'O Catarse não é responsável:'), ' pelo financiamento, divulgação e execução, nem pela entrega de recompensas dos projetos inscritos.'])]
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '8/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Suas responsabilidades')
        ]),
        m('div', 'É sua responsabilidade o recebimento do dinheiro da campanha e tudo aquilo que diz respeito a formatação do projeto, planejamento e divulgação da campanha de arrecadação, mobilização de apoiadores, execução do projeto, comunicação com apoiadores e produção e entrega de recompensas dentro do prazo estimado.')
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '9/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Retiradas de projetos no ar')
        ]),
        m('div', [m('span.fontweight-semibold'), 'O CATARSE reserva-se o direito de, a seu exclusivo critério e uma vez notificado a respeito, cancelar projetos e encerrar as contas de CRIADORES DE PROJETOS que violem nossas ', m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202387638-Diretrizes-para-cria%C3%A7%C3%A3o-de-projetos\'][target=\'_blank\']', 'Regras do Jogo'), ' e ', m('a.alt-link[href=\'http://www.catarse.me/terms-of-use\'][target=\'_blank\']', 'Termos de Uso'), '.'])
    ])
];

const flexTerms = project => [
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '1/9'),
            ' ',
            m('span.fontweight-semibold', 'What you can and can not change on the project page as of the post?')
        ]),
        m('div', [
            m('span.fontweight-semibold', 'You can not change'),
            ': a identidade do responsável pelo projeto (Nome / CPF ou Razão Social / CNPJ), a Modalidade de financiamento, o título do projeto, a URL (link) do projeto, a categoria do projeto, a meta de arrecadação,  o prazo (caso já tenha definido), e as recompensas onde existirem apoios já efetuados.',
            m('br'), m('br'),
            m('span.fontweight-semibold', 'You can change'),
            ': the main video of the campaign, the content of the description, the project image, the phrase of effect, the rewards where there are no supports made, in addition to adding new rewards during the collection'
        ])
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '2/9'),
            ' ',
            m('span.fontweight-semibold', 'Regras da modalidade FLEX')
        ]),
        m('div', 'Você escolheu a campanha flexível. Dessa maneira, você irá receber todos os recursos arrecadados junto aos apoiadores ao final do prazo da campanha (descontando a taxa do Catarse) e deverá cumprir com a execução do projeto e com a entrega das recompensas oferecidas independente do quanto arrecadar.')
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '3/9'),
            ' ',
            m('span.fontweight-semibold', 'Meta de arrecadação')
        ]),
        m('div', 'The goal can not be changed after the project has been published.')
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '4/9'),
            ' ',
            m('span.fontweight-semibold', 'Rates')
        ]),
        m('div', [
            'Ao final da campanha, cobraremos 13% sobre o ',
            m('span.fontweight-semibold', 'valor total arrecadado.')
        ])
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '5/9'),
            ' ',
            m('span.fontweight-semibold', 'Prazo da campanha')
        ]),
        m('div', 'Uma vez definido, o prazo de encerramento não poderá ser alterado. Caso você tenha iniciado a campanha com o prazo em aberto, deverá defini-lo durante a campanha, podendo deixar a campanha aberta por no máximo 12 meses.')
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '6/9'),
            ' ',
            m('span.fontweight-semibold', 'Prazo para repasse')
        ]),
        m('div', m.trust('Quando o prazo do seu projeto chegar ao fim, você deverá inscrever e confirmar seus dados bancários. Você poderá alterar o Banco, Conta e a Agência <strong>somente se a nova conta cadastrada for de sua titularidade</strong>. Após a confirmação, o Catarse depositará na sua conta corrente em até 10 dias úteis. O valor depositado já estará considerando o desconto de 13% da taxa.'))
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '7/9'),
            ' ',
            m('span.fontweight-semibold', 'Responsabilidade do Catarse')
        ]), [m('div', [m('span.fontweight-semibold'), m('span.fontweight-semibold', 'O Catarse é responsável:'), ' pelo desenvolvimento tecnológico da plataforma, atendimento de dúvidas e problemas (tanto de apoiadores quanto de realizadores), por hospedar o projeto na plataforma e por garantir a segurança das transações financeiras.\ ', m('br'), m('br'), m('span.fontweight-semibold', 'O Catarse não é responsável:'), ' pelo financiamento, divulgação e execução, nem pela entrega de recompensas dos projetos inscritos.'])]
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '8/9'),
            ' ',
            m('span.fontweight-semibold', 'Suas responsabilidades')
        ]),
        m('div', 'É sua responsabilidade o recebimento do dinheiro da campanha e tudo aquilo que diz respeito a formatação do projeto, planejamento e divulgação da campanha de arrecadação, mobilização de apoiadores, execução do projeto, comunicação com apoiadores e produção e entrega de recompensas dentro do prazo estimado.')
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontsize-smallest.fontcolor-secondary', '9/9'),
            ' ',
            m('span', {
                style: {
                    'font-weight': ' 600'
                }
            }, 'Retiradas de projetos no ar')
        ]),
        m('div', [m('span.fontweight-semibold'), 'O CATARSE reserva-se o direito de, a seu exclusivo critério e uma vez notificado a respeito, cancelar projetos e encerrar as contas de CRIADORES DE PROJETOS que violem nossas ', m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202387638-Diretrizes-para-cria%C3%A7%C3%A3o-de-projetos\'][target=\'_blank\']', 'Regras do Jogo'), ' e ', m('a.alt-link[href=\'http://www.catarse.me/terms-of-use\'][target=\'_blank\']', 'Termos de Uso'), '.'])
    ])
];

const subTerms = project => [
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '1/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'What you can and can not change on the project page as of the post?'
            )
        ]),
        m('div', [
            m('span.fontweight-semibold',
                'You can not change:'
            ),
            ' a identidade do responsável pelo projeto (Nome / CPF ou Razão Social / CNPJ), a Modalidade de financiamento, o título do projeto, a URL (link) do projeto, a categoria escolhida e as recompensas onde existirem apoios já efetuados.',
            m('br'),
            m('br'),
            m('span.fontweight-semibold',
                'You can change: '
            ),
            'o conteúdo da descrição do projeto, o vídeo principal da campanha, as imagens do projeto, a frase de efeito, as recompensas onde não existirem apoios efetuados, além de adicionar novas recompensas e novas metas durante a arrecadação.'
        ])
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '2/9'
            ),
            m('span.fontweight-semibold',
                'Regras da modalidade Assinatura'
            )
        ]),
        m('div',
            'Você escolheu a modalidade Assinatura. Dessa maneira, você irá receber em tempo real, no saldo de sua conta no Catarse, os recursos arrecadados pelos seus assinantes. Você é o responsável por entregar as recompensas oferecidas aos seus assinantes.'
        )
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '3/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Metas de arrecadação'
            )
        ]),
        m('div',
            'Você poderá alterar, durante a campanha no ar, as suas metas de arrecadação em qualquer momento, independente de já tê-las atingido ou não. A única restrição imposta é que o seu projeto tenha sempre ao menos uma meta definida.'
        )
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '4/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Rates'
            )
        ]),
        m('div', [
            'Cobramos 13% sobre todos os valores arrecadados em sua campanha de assinatura. ',
            m('span.fontweight-semibold')
        ])
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '5/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Prazo da campanha'
            )
        ]),
        m('div',
            'No Catarse Assinaturas você pode manter sua campanha no ar por quanto tempo você quiser.'
        )
    ]),

    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '6/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Regras da transferência de dinheiro'
            )
        ]),
        m('div', [
            'Você poderá realizar 01 saque mensal (que é como chamamos a transferência do seu saldo no Catarse para sua conta bancária cadastrada). Assim que você solicitar o saque, o Catarse depositará o valor, já com o desconto da taxa, na sua conta corrente em até 10 dias úteis.',
            m.trust('&nbsp;')
        ])
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '7/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Responsabilidade do Catarse'
            )
        ]),
        m('div', [
            m('span.fontweight-semibold'),
            m('span.fontweight-semibold',
                'O Catarse é responsável:'
            ),
            m.trust('&nbsp;'),
            'pelo desenvolvimento tecnológico da plataforma, atendimento de dúvidas e problemas (tanto de apoiadores quanto de realizadores), por hospedar o projeto na plataforma e por garantir a segurança das transações financeiras.',
            m('br'),
            m('br'),
            m('span.fontweight-semibold',
                'O Catarse não é responsável:'
            ),
            m.trust('&nbsp;'),
            'pelo financiamento, divulgação e execução, nem pela entrega de recompensas dos projetos inscritos.'
        ])
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '8/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Suas responsabilidades'
            )
        ]),
        m('div', [
            m('span.fontweight-semibold'),
            m('span.fontweight-semibold'),
            'É sua responsabilidade o recebimento do dinheiro da campanha e tudo aquilo que diz respeito a formatação do projeto, planejamento e divulgação da campanha de arrecadação, mobilização de apoiadores, execução do projeto, comunicação com apoiadores e produção e entrega de recompensas dentro do prazo estimado.'
        ])
    ]),
    m('.w-col.w-col-11', [
        m('div', [
            m('span.fontcolor-secondary.fontsize-smallest',
                '9/9'
            ),
            m.trust('&nbsp;'),
            m('span.fontweight-semibold',
                'Retiradas de projetos no ar'
            )
        ]),
        m('div', [
            m('span.fontweight-semibold'),
            'O CATARSE reserva-se o direito de, a seu exclusivo critério e uma vez notificado a respeito, cancelar projetos e encerrar as contas de CRIADORES DE PROJETOS que violem nossas ',
            m("a.alt-link[href='http://suporte.catarse.me/hc/pt-br/articles/202387638-Diretrizes-para-cria%C3%A7%C3%A3o-de-projetos'][target='_blank']",
                'Regras do Jogo'
            ),
            ' e ',
            m("a.alt-link[href='http://www.catarse.me/terms-of-use'][target='_blank']",
                'Termos de Uso'
            ),
            '.'
        ])
    ])
];

const publishVM = {
    flexTerms,
    subTerms,
    aonTerms
};

export default publishVM;
