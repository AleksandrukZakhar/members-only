export const setUpDB = () => {
    const mongoDb = process.env.DB_URL;
    mongoose.connect(mongoDb, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongo connection error"));
};

export const setUpMiddleWares = () => {
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
        sassMiddleware({
            src: path.join(__dirname, "public"),
            dest: path.join(__dirname, "public"),
            indentedSyntax: false,
            sourceMap: true,
        })
    );
    app.use(
        require("express-session")({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(express.static(path.join(__dirname, "public")));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/", indexRouter);
};

export const setUpPassport = () => {
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};

export const setUpHTTPErrorHandlers = () => {
    app.use((req, res, next) => {
        next(createError(404));
    });

    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(err.status || 500);
        res.render("error");
    });
};
