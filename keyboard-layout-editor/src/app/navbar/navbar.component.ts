import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pickers from '../../assets/pickers.json';
import * as layouts from '../../assets/layouts.json';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private $cookies;
  private $scope;
  private userLoginWindow;
  private userLoginSecret;
  private $location;
  public user;
  public dirty;
  public samples;
  public presets;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.samples = layouts.samples;
    this.presets = layouts.presets;
  }

  updateUserInfo() {
    if (this.$cookies.oauthToken) {
      this.$scope.user = { id: '', name: "User", avatar: "<i class='fa fa-user'></i>" };
    } else {
      this.$scope.user = null;
    }
  }

  userLogout() {
    this.$cookies.oauthToken = "";
    this.updateUserInfo();
  }

  userLogin() {
    if (this.userLoginWindow) {
      if (this.userLoginWindow.closed) {
        this.userLoginSecret = null;
        this.userLoginWindow = null;
      } else {
        this.userLoginWindow.focus();
      }
    }

    if (!this.userLoginWindow && !this.$scope.user) {
      var parms = "&client_id=" + this.$scope.githubClientId + "&redirect_uri=" + (this.$location.host() === "localhost" ? "http://localhost:8080/oauth.html" : "http://www.keyboard-layout-editor.com/oauth.html");
      this.userLoginSecret = (window.performance && window.performance.now ? window.performance.now() : Date.now()).toString() + "_" + (Math.random()).toString();
      this.userLoginWindow = window.open("https://github.com/login/oauth/authorize?scope=gist&state=" + this.userLoginSecret + parms,
        "Sign in with Github", "left=" + (window.screenLeft + 50) + ",top=" + (window.screenTop + 50) + ",width=1050,height=630,personalbar=0,toolbar=0,scrollbars=1,resizable=1");
      if (this.userLoginWindow) {
        this.userLoginWindow.focus();
      }
    }
  }

  getPermalink() {
    var url = window.location.href.replace(/#.*$/, "");
    // url += "##" + URLON.stringify(this.$scope.serializedObjects);
    return url;
  }

  showOptions() {

  }

  loadCharacterPicker(picker) {
    let userGlyphsSentinel = {};
    this.$scope.picker = picker || {
      name: "User-Defined Glyphs",
      glyphs: this.$scope.customGlyphs,
      href: "https://github.com/ijprest/keyboard-layout-editor/wiki/Custom-Styles",
      description: "This list will show any glyphs defined in your layout's 'Custom Styles' tab.  See the Commodore VIC-20 sample layout for an example.",
      sentinel: userGlyphsSentinel
    };
    this.$scope.palette = {}; // turn off the palette
    this.$scope.pickerFilter = '';
    this.$scope.pickerSelection = {};

    // Load the CSS if necessary
    if (this.$scope.picker.css && !this.$scope.picker.glyphs) {
      this.http.get(this.$scope.picker.css).toPromise().then(function (css) {
        this.$scope.picker.glyphs = this.$renderKey.getGlyphsFromRules(this.$cssParser.parse(css));
      });
    }
  }

  loadSample(sample) {
    this.http.get(sample).toPromise().then(function (data) {
      this.$scope.loadPreset(data, sample);
    })
  }

  loadPreset(data) {

  }

}
