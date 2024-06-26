;(this.webpackJsonpreact = this.webpackJsonpreact || []).push([
    [0],
    {
        60: function (t, e, r) {
            'use strict'
            r.r(e)
            var c = r(0),
                n = r(39),
                o = r(63),
                a = r(40),
                s = r(23),
                i = r(4),
                j = r(11)
            function u() {
                return Object(j.jsx)(s.a, {
                    to: '/products',
                    children: 'Show albums',
                })
            }
            var d = r(7),
                b = r(12),
                p = r(62),
                l = r(61)
            function O() {
                var t = Object(p.a)(
                        ['products'],
                        Object(b.a)(
                            Object(d.a)().mark(function t() {
                                return Object(d.a)().wrap(function (t) {
                                    for (;;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                return (
                                                    (t.next = 2),
                                                    l.a.get(
                                                        'https://jsonplaceholder.typicode.com/albums',
                                                    )
                                                )
                                            case 2:
                                                return t.abrupt(
                                                    'return',
                                                    t.sent.data,
                                                )
                                            case 3:
                                            case 'end':
                                                return t.stop()
                                        }
                                }, t)
                            }),
                        ),
                        { refetchOnWindowFocus: !1 },
                    ),
                    e = t.isLoading,
                    r = t.isError,
                    c = t.error,
                    n = t.data
                return e
                    ? Object(j.jsx)('p', { children: 'Loading...' })
                    : r
                      ? Object(j.jsxs)('p', {
                            children: [
                                'Error: ',
                                c.toString() || 'Unknown error',
                            ],
                        })
                      : (console.log(n),
                        n.map(function (t) {
                            return Object(j.jsxs)(
                                'p',
                                {
                                    children: [
                                        'Album: ',
                                        Object(j.jsx)(s.a, {
                                            to: '/products/'.concat(t.id),
                                            children: t.title,
                                        }),
                                    ],
                                },
                                t.id,
                            )
                        }))
            }
            function h() {
                var t = Object(i.m)().id,
                    e = Object(p.a)(
                        ['product', t],
                        Object(b.a)(
                            Object(d.a)().mark(function e() {
                                return Object(d.a)().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (e.next = 2),
                                                    l.a.get(
                                                        'https://jsonplaceholder.typicode.com/albums/'.concat(
                                                            t,
                                                            '/photos',
                                                        ),
                                                    )
                                                )
                                            case 2:
                                                return e.abrupt(
                                                    'return',
                                                    e.sent.data,
                                                )
                                            case 3:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            }),
                        ),
                        { refetchOnWindowFocus: !1, enabled: !!t },
                    ),
                    r = e.isLoading,
                    c = e.isError,
                    n = e.error,
                    o = e.data
                return r
                    ? Object(j.jsx)('p', { children: 'Loading...' })
                    : c
                      ? Object(j.jsxs)('p', {
                            children: [
                                'Error: ',
                                n.toString() || 'Unknown error',
                            ],
                        })
                      : (console.log(o),
                        Object(j.jsxs)(j.Fragment, {
                            children: [
                                Object(j.jsx)(s.a, {
                                    to: '/products',
                                    children: 'Back',
                                }),
                                o.map(function (t) {
                                    return Object(j.jsx)(
                                        'p',
                                        {
                                            children: Object(j.jsx)('img', {
                                                src: t.thumbnailUrl,
                                            }),
                                        },
                                        t.id,
                                    )
                                }),
                            ],
                        }))
            }
            function x() {
                var t = Object(s.b)([
                        { path: '/', element: Object(j.jsx)(u, {}) },
                        { path: '/products', element: Object(j.jsx)(O, {}) },
                        {
                            path: '/products/:id',
                            element: Object(j.jsx)(h, {}),
                        },
                    ]),
                    e = new o.a()
                return Object(j.jsx)(a.a, {
                    client: e,
                    children: Object(j.jsx)(i.b, { router: t }),
                })
            }
            var m = document.getElementById('root')
            Object(n.createRoot)(m).render(
                Object(j.jsx)(c.StrictMode, { children: Object(j.jsx)(x, {}) }),
            )
        },
    },
    [[60, 1, 2]],
])
//# sourceMappingURL=main.16aa6c70.chunk.js.map
