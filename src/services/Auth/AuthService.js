import axios from 'axios';
import { Constants } from '@commons';

const axios_instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});
const axios_instance1 = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});
class AuthService {
  authlogin = (email, password) => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/login.php?email=${email}&password=${password}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
          } else if (res.status !== 200) {
            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authupdate = () => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/mls_organizations.php`)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
            // alert(res.data);
            Constants.MlsData = res.data;
          } else if (res.status !== 200) {
            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  profile_login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/login.php?email=${email}&password=${password}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve(res.data);
          } else if (res.status !== 200) {
            reject(res.data);
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authdownloadstationlist = () => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/state_list.php`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloadmortgage = (advertisingid, accountnum) => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_mortgage_partners.php?advertisingid=${advertisingid}&accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloaddisclosure = (accountnum, state) => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/prefillpdf.php?accountnum=${accountnum}&state=${state}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloadProperties = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_properties.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloadPropertyAttende = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_oh_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloadPropertyBrokerAttende = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_broker_oh_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  authdownloadEvent = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/list_events.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authdownloadEventAttend = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_event_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authdownloadMLSLinkAccount = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/agent_linked_mls.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  //Login
  authrequestpassword = email => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/forgotpassword.php?email=${email}`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authgetRealtortitles = () => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/get_realtor_titles.php`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  //Create accoun  part.......
  authgetbrokersname = () => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/get_brokers_name.php`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authgetorganizations = () => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(`${Constants.BASE_API_URL}/mls_organizations.php`)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  authcreateaccount = (
    firstname,
    lastname,
    cellphone,
    officetelephone,
    title,
    email,
    uniqueid,
    officename,
    password,
    company_logo_url,
    device,
    appid,
  ) => {
    let bodyFormData = new FormData();
    bodyFormData.append('firstname', firstname);
    bodyFormData.append('lastname', lastname);
    bodyFormData.append('cellphone', cellphone);
    bodyFormData.append('officetelephone', officetelephone);
    bodyFormData.append('title', title);
    bodyFormData.append('email', email);
    bodyFormData.append('uniqueid', uniqueid);
    bodyFormData.append('officename', officename);
    bodyFormData.append('mlsorganizationid', '0');
    bodyFormData.append('password', password);
    bodyFormData.append('company_logo_url', company_logo_url);
    bodyFormData.append('device', "Android");
    //Android AMAZON
    bodyFormData.append('appid', appid);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/new_account.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
}

const instance = new AuthService();
export default instance;
