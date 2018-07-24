export default {
    admin: [
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            children: [
                {
                    name: 'Noticias',
                    url: '/dashboard/dashboard',
                    icon: 'icon-layers'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '/admin/dwellings/appraisals',
                    icon: 'icon-layers'
                },
                {
                    name: 'Reportes',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                }
            ]
        },
        {
            name: 'Propiedades',
            url: '/admin/dwellings',
            icon: 'icon-home',
            children: [
                {
                    name: 'Buscar',
                    url: '/admin/dwellings/search',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Agregar Propiedad',
                    url: '/admin/dwellings/general',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Propiedades Favoritas',
                    url: '/dwellings/latest',
                    icon: 'icon-star'
                },
                {
                    name: 'Tasaciones',
                    url: '/admin/dwellings/appraisals',
                    icon: 'icon-layers',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Pedidos de visita',
                    url: '/admin/team/ask',
                    icon: 'icon-emotsmile',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Reportes',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Buscar',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                }
            ]
        },
        {
            name: 'Equipos SIOC',
            url: '/admin/team',
            icon: 'icon-layers',
            children: [
                {
                    name: 'Nueva Inmobiliaria',
                    url: '/admin/team/add',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Inmobiliarias',
                    url: '/admin/team/list',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Martilleros',
                    url: '/admin/auctioneers/auctioneers',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Vendedores',
                    url: '/admin/sellers/sellers',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Capitanes',
                    url: '/admin/captains/captains',
                    icon: 'icon-pencil'
                }

            ]
        },
        {
            name: 'Usuarios',
            url: '/admin/users/list',
            icon: 'icon-layers',
        }
    ],
    martillero: [
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            children: [
                {
                    name: 'Noticias',
                    url: '/dashboard/dashboard',
                    icon: 'icon-layers'
                },
                {
                    name: 'Últimas Propiedades',
                    url: '/dashboard/gralLatest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '',
                    icon: 'icon-layers'
                },
                {
                    name: 'Reportes',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                }
            ]
        },
        {
            name: 'Propiedades',
            url: '/admin/dwellings',
            icon: 'icon-home',
            children: [
                {
                    name: 'Buscar',
                    url: '/admin/dwellings/search',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Agregar Propiedad',
                    url: '/admin/dwellings/general',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Propiedades Favoritas',
                    url: '/admin/dwellings/bookmark',
                    icon: 'icon-star'
                },
                {
                    name: 'Tasaciones',
                    url: '',
                    icon: 'icon-layers',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Pedidos de visita',
                    url: '/admin/team/ask',
                    icon: 'icon-emotsmile',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Reportes',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Buscar',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                }
            ]
        },
        {
            name: 'Equipos SIOC',
            url: '/admin/team',
            icon: 'icon-layers',
            children: [
                {
                    name: 'Integrantes',
                    url: '/admin/team/list',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Vendedores',
                    url: '/admin/users/add',
                    icon: 'icon-pencil'
                }

            ]
        }
    ],
    vendedor: [
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            // badge: {
            //     variant: 'info',
            //     text: 'NEW'
            // }
            children: [
                {
                    name: 'Noticias',
                    url: '/dashboard/dashboard',
                    icon: 'icon-layers'
                },
                {
                    name: 'Últimas Propiedades',
                    url: '/dashboard/gralLatest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '',
                    icon: 'icon-layers'
                }
            ]
        },
        {
            name: 'Propiedades',
            url: '/admin/dwellings',
            icon: 'icon-home',
            children: [
                {
                    name: 'Buscar',
                    url: '/admin/dwellings/search',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Agregar Propiedad',
                    url: '/admin/dwellings/general',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Propiedades Favoritas',
                    url: '/admin/dwellings/bookmark',
                    icon: 'icon-star'
                },
                {
                    name: 'Tasaciones',
                    url: '',
                    icon: 'icon-layers',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Pedidos de visita',
                    url: '/admin/team/ask',
                    icon: 'icon-emotsmile',
                    badge: {
                        variant: 'info',
                        text: 'Nuevo'
                    }
                },
                {
                    name: 'Reportes',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Buscar',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                }
            ]
        },
        {
            name: 'Equipos SIOC',
            url: '/admin/team/list',
            icon: 'icon-layers'
        }
    ],
    user: [
        {
            name: 'Mis Propiedades',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            children: [
                {
                    name: 'Tasaciones',
                    url: '',
                    icon: 'icon-energy'
                },
                {
                    name: 'En Alquiler',
                    url: '',
                    icon: 'icon-energy'
                },
                {
                    name: 'En Venta',
                    url: '',
                    icon: 'icon-energy'
                },
                {
                    name: 'Pedidos de visita',
                    url: '',
                    icon: 'icon-energy'
                }
            ]
        },
        {
            name: 'Favoritas',
            url: '',
            icon: 'icon-layers'
        },
        {
            name: 'Últimas Publicadas',
            url: '',
            icon: 'icon-energy'
        }
    ]
};
