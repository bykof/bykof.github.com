;(this.webpackJsonpreact = this.webpackJsonpreact || []).push([
    [0],
    {
        17: function (e, t, c) {
            'use strict'
            c.r(t)
            var n = c(1),
                r = c.n(n),
                a = c(6),
                s = c(7),
                l = c(4),
                j = c(0)
            function i() {
                var e = r.a.useState(''),
                    t = Object(l.a)(e, 2),
                    c = t[0],
                    n = t[1],
                    a = r.a.useState(null),
                    i = Object(l.a)(a, 2),
                    o = i[0],
                    b = i[1],
                    u = r.a.useState([]),
                    d = Object(l.a)(u, 2),
                    h = d[0],
                    p = d[1]
                return Object(j.jsxs)(j.Fragment, {
                    children: [
                        Object(j.jsx)('h3', {
                            children:
                                'Santa has to write down some elves to create a proper supply-chain. Help him!',
                        }),
                        Object(j.jsxs)('form', {
                            onSubmit: function (e) {
                                e.preventDefault(),
                                    c.length < 3
                                        ? b(
                                              'Please provide at least three characters',
                                          )
                                        : (p([].concat(Object(s.a)(h), [c])),
                                          n(''),
                                          b(null))
                            },
                            children: [
                                Object(j.jsx)('p', { children: 'Add an elf' }),
                                Object(j.jsx)('label', {
                                    htmlFor: 'elf-name',
                                    children: 'Name',
                                }),
                                Object(j.jsx)('br', {}),
                                Object(j.jsx)('input', {
                                    type: 'text',
                                    id: 'elf-name',
                                    value: c,
                                    onChange: function (e) {
                                        return n(e.target.value)
                                    },
                                }),
                                o &&
                                    Object(j.jsx)('p', {
                                        style: {
                                            background: 'red',
                                            color: 'white',
                                            padding: '0.5em',
                                        },
                                        children: o,
                                    }),
                                Object(j.jsx)('button', {
                                    type: 'submit',
                                    children: 'Add',
                                }),
                            ],
                        }),
                        Object(j.jsx)('hr', {}),
                        Object(j.jsx)('ul', {
                            children: h.map(function (e) {
                                return Object(j.jsx)('li', { children: e }, e)
                            }),
                        }),
                    ],
                })
            }
            var o = document.getElementById('root')
            Object(a.createRoot)(o).render(
                Object(j.jsx)(n.StrictMode, { children: Object(j.jsx)(i, {}) }),
            )
        },
    },
    [[17, 1, 2]],
])
//# sourceMappingURL=main.b2b4776e.chunk.js.map
