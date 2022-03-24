# mocks
1. account: value logged account
2. blog: blog text inside the Blog Menu
3. products: products values inside the Product Menu
4. user: user values iniside the User Menu table

# Components
1. ColorManyPicker: styled sidebar from ProductFilterSidebar
2.  ColorPreview: styled cards imported in ProductCard
3. Iconify: styled icons
4. Label: type label
5. Logo: logo
6. MenuPopHover: account icon menu imported in AccountPopHover
7. NavSection: Menu Component imported Menu DashboardSideBar
8. Page: Component Scope to body
9. ScrollBar: Component Scroll
10. ScrolltoTop: **non identify**
11. SearchNotFound: text to page 404
12. SvgIconStyle: styled to svg icons

	## Animate (to page 404)
	1. index: animate route
	2.  MotionContainer: animation inside page 404

		### Variants
		1. index: variants route
		2. wrap: inside MotionContainer

		### Bounce
		1. index: bounce route
		2. BounceIn and BounceOut: transitions

	## Charts
	3. index: route charts
	4. BaseOptionChart: styled charts

# Hooks
1. UseResponsive: identify screensize and resize components

# Layouts
1. AuthLayout: label register and login
2. LogoOnlyLayout: logo used in page 404

	## Dashboard
	1. AccountPopover: menu account
	2. DashboardNavbar: header (toolbar)
	3. DashboardSidebar: drawer
	4. index: Scope and style
	5. LanguagePopover: Languages from Toolbar
	6. NotificationPopover: Component and fake notifications
	7. SearchBar: Component searchbar
	8. SidebarConfig: list items menu drawer
	
# Pages
1. Blog: body from page blog
2. DashboardApp: body from Home
3. Login: body from Login
4. Page404: body from page 404
5. Products: body from products
6. Register: body from register
7. User: body from user

# Section
## @Dashboard
### app (imported in DashboardApp)
1. AppCães: card
2. AppConversationRates: chart bar
3. AppCurentSubjects: chart radar
4. AppDonation: card
5. AppGatos: card
6. AppLineBar: chart line
7. AppNewsUpdates: recent news	
8. AppOrderTimeline: timeline
9. AppPie: chart pie
10. AppTasks: Tasks Checkbox 
11. AppWebsiteVisits: chart bar
12. index: routes

	### blog (imported in Blog)
	1. BlogPostCard: cards array
	2. BlogPostSearch: searchbar
	3. BlogPostSort: filter by
	4. index: routes

	### Products
	1. index: routes
	2. ProductCard: cards array
	3. ProductCartWidget: my cart
	4. ProductFilterSidebar: 
	5. ProductList:
	6. ProductSort: 

    ### user
	1. UserListHead: column params
	2. UserListToolbar: header with filter and searchbar from user
	3. UserMoreMenu: menu edit or delete row

## Autentication
1. AuthSocial: other ways to login
	
	### login
	1. index: route
	2. LoginForm:  Inputs and texts using formik to login

	### Register
	1. index: route
	2. RegisterForm:  Inputs and texts using formik to register
	
# Theme
1. Breakpoints:
2. GlobalStyles: **non identify**
3. index: routes
4. pallete: all Colors style
5. shadows:  all shadows style
6. typograph: all labels style

    ## Overrides
	1. Autocomplete: style (used in BlogPostSearch)
	2. Backdrop: style backdrop (idk where used)
	3. Button: style buttons
	4. Card: style card
	5. IconButton: style iconButtoon
	6. index: routes
	7. Input: style Input
	8. Lists: style list
	9. Paper: style paper
	10. Tooltip: style check
	11. Typograph: style label

# Utils
1. formatNumber: mask to number
2. formatTime: mask to date
3. mockImages: icons

# Routes
pages division
