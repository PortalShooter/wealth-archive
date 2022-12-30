export const requestError = (route, err) => `Request to ${route} falied. Check ".env.development" and ".env.production" files and then run "npm run build" command. ${err}`
