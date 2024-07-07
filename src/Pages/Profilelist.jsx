import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Sidemenu from "../Common/Sidemenu";


function Profilelist(){
    return(
        <>
            <Sidemenu/>
            <Header/>
            
            <div id="app">
              <section className="is-title-bar">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <ul>
        
              <li><a href="./">Admin</a></li>
            
              <li>Profile</li>
            </ul>
           
          </div>
        </section>

        <section className="is-hero-bar">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <h1 className="title">
              Profile
            </h1>
            <a href="./">
            <button className="button blue">Button</button>
            </a>
          </div>
        </section>

  <section className="section main-section">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon"><i className="mdi mdi-account-circle"></i></span>
            Edit Profile
          </p>
        </header>
        <div className="card-content">
          <form>
            <div className="field">
              <label className="label">Avatar</label>
              <div className="field-body">
                <div className="field file">
                  <label className="upload control">
                    <a className="button blue">
                      Upload
                    </a>
                    <input type="file"/>
                  </label>
                </div>
              </div>
            </div>
            <hr/>
            <div className="field">
              <label className="label">Name</label>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="text" autocomplete="on" name="name" placeholder="John Doe" className="input" required=""/>
                  </div>
                  <p className="help">Required. Your name</p>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">E-mail</label>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input type="email" autocomplete="on" name="email" placeholder="user@example.com" className="input" required=""/>
                  </div>
                  <p className="help">Required. Your e-mail</p>
                </div>
              </div>
            </div>
            <hr/>
            <div className="field">
              <div className="control">
                <button type="submit" className="button green">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon"><i className="mdi mdi-account"></i></span>
            Profile
          </p>
        </header>
        <div className="card-content">
          <div className="image w-48 h-48 mx-auto">
            <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" className="rounded-full"/>
          </div>
          <hr/>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text" readonly="" value="John Doe" className="input is-static"/>
            </div>
          </div>
          <hr/>
          <div className="field">
            <label className="label">E-mail</label>
            <div className="control">
              <input type="text" readonly="" value="user@example.com" className="input is-static"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon"><i className="mdi mdi-lock"></i></span>
          Change Password
        </p>
      </header>
      <div className="card-content">
        <form>
          <div className="field">
            <label className="label">Current password</label>
            <div className="control">
              <input type="password" name="password_current" autocomplete="current-password" className="input" required=""/>
            </div>
            <p className="help">Required. Your current password</p>
          </div>
          <hr/>
          <div className="field">
            <label className="label">New password</label>
            <div className="control">
              <input type="password" autocomplete="new-password" name="password" className="input" required=""/>
            </div>
            <p className="help">Required. New password</p>
          </div>
          <div className="field">
            <label className="label">Confirm password</label>
            <div className="control">
              <input type="password" autocomplete="new-password" name="password_confirmation" className="input" required=""/>
            </div>
            <p className="help">Required. New password one more time</p>
          </div>
          <hr/>
          <div className="field">
            <div className="control">
              <button type="submit" className="button green">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  </div>
            

        <Footer/>
        
        </>
    );
}
export default Profilelist;