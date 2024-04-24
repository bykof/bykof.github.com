;(this.webpackJsonpreact = this.webpackJsonpreact || []).push([
    [0],
    {
        14: function (e, t, s) {},
        15: function (e, t, s) {
            'use strict'
            s.r(t)
            var r = s(1),
                c = s.n(r),
                i = s(4),
                a = s(2),
                o = s(0)
            function n(e) {
                var t = e.user,
                    s = (e.onHide, c.a.useState(!1)),
                    r = Object(a.a)(s, 2),
                    i = r[0],
                    n = r[1]
                return Object(o.jsxs)('div', {
                    className: 'App',
                    children: [
                        Object(o.jsx)('img', {
                            src: t.profilePicture,
                            height: '200px',
                            alt: 'John Smith Profile',
                        }),
                        Object(o.jsxs)('h1', {
                            children: [t.firstName, ' ', t.lastName],
                        }),
                        Object(o.jsxs)('p', {
                            children: [
                                Object(o.jsxs)('small', {
                                    children: ['Phone: ', t.phone],
                                }),
                                ' ',
                                Object(o.jsx)('br', {}),
                                Object(o.jsxs)('small', {
                                    children: [
                                        'Email: ',
                                        Object(o.jsx)('a', {
                                            href: 'mailto:'.concat(t.email),
                                            children: t.email,
                                        }),
                                    ],
                                }),
                                ' ',
                                Object(o.jsx)('br', {}),
                                Object(o.jsx)('br', {}),
                                Object(o.jsx)('a', {
                                    href: t.website,
                                    children: 'Website',
                                }),
                            ],
                        }),
                        i &&
                            Object(o.jsxs)('p', {
                                children: [
                                    t.address.street,
                                    ' ',
                                    Object(o.jsx)('br', {}),
                                    t.address.zipcode,
                                    ' ',
                                    t.address.city,
                                    ' ',
                                    Object(o.jsx)('br', {}),
                                    t.address.country,
                                    ' ',
                                    Object(o.jsx)('br', {}),
                                ],
                            }),
                        Object(o.jsxs)('button', {
                            type: 'button',
                            onClick: function () {
                                return n(!i)
                            },
                            children: [i ? 'Hide' : 'Show', ' Address'],
                        }),
                    ],
                })
            }
            s(14)
            function j() {
                var e = c.a.useState([
                        {
                            id: 1,
                            firstName: 'John',
                            lastName: 'Smith',
                            email: 'john@example.com',
                            profilePicture:
                                'https://images.pexels.com/photos/6206980/pexels-photo-6206980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            phone: '+1 (123) 456-7890',
                            address: {
                                street: '9062 Mertz Plains Apt. 623',
                                buildingNumber: '410',
                                city: 'Boganside',
                                zipcode: '71562',
                                country: 'Estonia',
                            },
                            website: 'http://www.johnsmith.com',
                        },
                        {
                            id: 2,
                            firstName: 'Raegan',
                            lastName: 'Haley',
                            email: 'ustroman@hotmail.com',
                            profilePicture:
                                'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            phone: '+5089956276536',
                            address: {
                                street: '2922 Retha Plaza',
                                city: 'Lake Gail',
                                zipcode: '26859-4338',
                                country: 'Mozambique',
                            },
                            website: 'http://zboncak.biz',
                        },
                    ]),
                    t = Object(a.a)(e, 2),
                    s = t[0]
                t[1]
                return Object(o.jsx)(o.Fragment, {
                    children: s.map(function (e) {
                        return Object(o.jsx)(n, { user: e }, e.id)
                    }),
                })
            }
            var b = document.getElementById('root')
            Object(i.createRoot)(b).render(
                Object(o.jsx)(r.StrictMode, { children: Object(o.jsx)(j, {}) }),
            )
        },
    },
    [[15, 1, 2]],
])
//# sourceMappingURL=main.96aad71e.chunk.js.map
