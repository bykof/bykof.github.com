;(this.webpackJsonpreact = this.webpackJsonpreact || []).push([
    [0],
    {
        28: function (e, t, c) {
            'use strict'
            c.r(t)
            var n = c(3),
                r = c.n(n),
                a = c(12),
                s = c(7),
                i = c(11),
                o = c(6),
                l = c(30),
                u = c(2)
            function d() {
                var e = r.a.useState([]),
                    t = Object(o.a)(e, 2),
                    c = t[0],
                    n = t[1],
                    a = r.a.useState(null),
                    d = Object(o.a)(a, 2),
                    b = d[0],
                    j = d[1],
                    p = r.a.useState([]),
                    h = Object(o.a)(p, 2),
                    m = h[0],
                    O = h[1],
                    f = (function () {
                        var e = Object(i.a)(
                            Object(s.a)().mark(function e() {
                                var t
                                return Object(s.a)().wrap(function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (e.next = 2),
                                                    l.a.get(
                                                        'https://jsonplaceholder.typicode.com/albums',
                                                    )
                                                )
                                            case 2:
                                                ;(t = e.sent), n(t.data)
                                            case 4:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            }),
                        )
                        return function () {
                            return e.apply(this, arguments)
                        }
                    })(),
                    x = (function () {
                        var e = Object(i.a)(
                            Object(s.a)().mark(function e(t) {
                                var c
                                return Object(s.a)().wrap(function (e) {
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
                                                ;(c = e.sent), O(c.data)
                                            case 4:
                                            case 'end':
                                                return e.stop()
                                        }
                                }, e)
                            }),
                        )
                        return function (t) {
                            return e.apply(this, arguments)
                        }
                    })()
                return (
                    r.a.useEffect(function () {
                        f().catch(console.error)
                    }, []),
                    Object(u.jsxs)('div', {
                        children: [
                            Object(u.jsx)('h1', { children: 'Albums' }),
                            c.map(function (e) {
                                return Object(u.jsx)(
                                    'div',
                                    {
                                        onClick: function () {
                                            return (function (e) {
                                                j(e),
                                                    x(e.id).catch(console.error)
                                            })(e)
                                        },
                                        style: {
                                            display: 'inline-block',
                                            padding: '0.5em',
                                            border: '1px solid black',
                                            margin: '0.25em',
                                            cursor: 'pointer',
                                        },
                                        children: e.title,
                                    },
                                    e.id,
                                )
                            }),
                            Object(u.jsx)('hr', {}),
                            Object(u.jsx)('h1', { children: 'Photos' }),
                            !b && 'Please select an album',
                            b &&
                                Object(u.jsxs)('p', {
                                    children: ['You selected album: ', b.title],
                                }),
                            b &&
                                m.map(function (e) {
                                    return Object(u.jsxs)(
                                        'div',
                                        {
                                            style: {
                                                display: 'inline-block',
                                                padding: '0.5em',
                                                border: '1px solid black',
                                                margin: '0.25em',
                                            },
                                            children: [
                                                Object(u.jsx)('p', {
                                                    children: e.title,
                                                }),
                                                Object(u.jsx)('img', {
                                                    src: e.thumbnailUrl,
                                                }),
                                            ],
                                        },
                                        e.id,
                                    )
                                }),
                        ],
                    })
                )
            }
            var b = document.getElementById('root')
            Object(a.createRoot)(b).render(
                Object(u.jsx)(n.StrictMode, { children: Object(u.jsx)(d, {}) }),
            )
        },
    },
    [[28, 1, 2]],
])
//# sourceMappingURL=main.05a86008.chunk.js.map
