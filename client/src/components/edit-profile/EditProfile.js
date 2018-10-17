import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import { withRouter, Link } from 'react-router-dom'
import isEmpty from '../../validation/isEmpty'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      experience: '',
      education: '',
      // twitter: "",
      // facebook: "",
      // linkedin: "",
      // youtube: "",
      // instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.props.getCurrentProfile()
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile
      const skillsCSV = profile.skills.join(',')
  
      profile.handle = !isEmpty(profile.handle) ? profile.handle : ''
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.skills = !isEmpty(profile.skills) ? skillsCSV : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      profile.status = !isEmpty(profile.status) ? profile.status : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
    
      
      this.setState({
      handle: profile.handle,
      company: profile.company,
      skills: profile.skills,
      website: profile.website,
      location: profile.location,
      status: profile.status,
      skills: skillsCSV,
      githubusername: profile.githubusername,
      bio: profile.bio,
      // twitter: profile.twitter,
      // facebook: profile.facebook,
      // linkedin: profile.linkedin,
      // youtube: profile.youtube,
      // instagram: profile.instagram,
      })
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    this.props.createProfile(profileData, this.props.history)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-twitter" />
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Twitter Profile URL"
              name="twitter"
              value={this.state.twitter}
              onChange={this.onChange}
            />
            {errors.twitter?errors.twitter:null}
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-facebook" />
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Facebook Page URL"
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
            />
            {errors.facebook?errors.facebook:null}
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-linkedin" />
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Linkedin Profile URL"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
            />
            {errors.linkedin?errors.linkedin:null}
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-youtube" />
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="YouTube Channel URL"
              name="youtube"
              value={this.state.youtube}
              onChange={this.onChange}
            />
            {errors.youtube?errors.youtube:null}
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-instagram" />
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Instagram Page URL"
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
            />
            {errors.instagram?errors.instagram:null}
          </div>
        </div>
      );
    } else{socialInputs=null}
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
            
              <small className="d-block pb-3">* = required field</small>
              <form  onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    className="form-control form-control-lg"
                    error={errors.handle}
                    placeholder="* Profile handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                  {errors.status ? errors.status : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                  {errors.company ? errors.company : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Could be your own or a company website
                  </small>
                  {errors.website ? errors.website : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    City & state suggested (eg. Boston, MA)
                  </small>
                  {errors.location ? errors.location : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                  {errors.skills ? errors.skills : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    If you want your latest repos and a Github link, include
                    your username
                  </small>
                  {errors.githubusername ? errors.githubusername : null}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                  {errors.bio ? errors.bio : null}
                </div>

                <div className="mb-3">
                  <button type="button"
                    onClick={() =>{
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}

                <input type="submit" onClick={this.onSubmit} value="Submit"className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
