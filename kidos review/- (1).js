// Backend
  // - try to minimalize your routes in app.js so one app.use('/api', authRoutes);
  // - look in to slug 
  // try ot use also object destructering in back end, see main/search.js
    // - var User not used
  // - not consistent with environment variables
  // - To prevent people from finding out your local database password is the same one you use for every single one of your accounts on the internet, add the .env file to your .gitignore.
  // using config.json
  // - backend .env should also contain db local variable
      // - see mongoose.connect
      // - app.use(cors)