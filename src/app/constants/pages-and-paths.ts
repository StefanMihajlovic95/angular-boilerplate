export const PAGES_AND_PATHS = {
    login: {
        pageName: 'LOGIN',
        pageInRouting: 'login',
        pagePath: '/login',
        showTab: false,
        inTab: false,
        tabIcon: null,
        showSidemenu: false,
        isChild: false,
        parent: null,
        pageHaveParams: false,
        needAuthentication: false,
        pagePathWithoutParams: ['/login']
    },
    dashboard: {
        pageName: 'DASHBOARD',
        pageInRouting: 'dashboard',
        pagePath: '/tabs/dashboard',
        showTab: true,
        inTab: true,
        tabIcon: null,
        showSideenu: true,
        isChild: false,
        parent: null,
        pageHaveParams: false,
        needAuthentication: true,
        pagePathWithoutParams: ['/dashboard']
    },
    userProfile: {
        pageName: 'USER_PROFILE',
        pageInRouting: 'user-profile',
        pagePath: '/user-profile',
        showTab: true,
        inTab: true,
        tabIcon: null,
        showSideenu: true,
        isChild: false,
        parent: null,
        pageHaveParams: false,
        needAuthentication: true,
        pagePathWithoutParams: ['/user-profile']
    },
};

export const DEFAULT_AUTHENTICATED_PAGE = {
    page: PAGES_AND_PATHS.userProfile
};
