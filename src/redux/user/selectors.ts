interface User {
    token: string;
    id: string;
    role: string;
    stripeCustomerId: string;
    email: string;
    currentCompanyId: string;
    companyOwner: boolean;
  }
  
  export const getUserToken = (state: {user: User}) => state.user.token;
  