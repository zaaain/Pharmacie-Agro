import ApiClient from 'Api/index';

const token = localStorage.getItem("jwt");

export default function useClient() {
  // const authReducer = useSelector(state => state.auth);
  // const token = authReducer && !isEmpty(authReducer.token) ? authReducer.token : "";
  const api = new ApiClient(token);
  return { api };
}
