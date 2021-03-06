#### Hexo blog with dark cactus theme using Travis-CI for deployment
[![Build Status](https://travis-ci.org/ross-oreto/blog.svg?branch=master)](https://travis-ci.org/ross-oreto/blog)

 - in project root
```
$ npm install hexo-cli -g
$ npm install
$ hexo serve
```

##### To create a new post or a new page, you can run the following command:
``` 
$ hexo new [layout] <title>
```

#####  Deploy After Generating
``` 
$ hexo generate --deploy
``` 

#### editor
 - https://github.com/jaredly/hexo-admin
 - http://localhost:4000/admin
 
 
#### Theme
 - https://github.com/probberechts/cactus-dark
 - themes/cactus-dark/_config.yml
```
  Projects: http://github.com/ross-oreto
  projects_url: http://github.com/ross-oreto
      social_links:
          github: https://github.com/ross-oreto
          twitter: https://twitter.com/rossoreto
          facebook: https://www.facebook.com/ross.oreto
          linkedin: https://www.linkedin.com/in/ross-oreto-0b8a429/
  plugins:
      disqus_shortname: ross-oreto
      google_analytics: UA-86660611-1 # enter the tracking ID for your Google Analytics
```

#### hexo-admin
 - dark theme add to the bottom of /node_modules/hexo_admin/www/bundle.css
```
.posts_list {
  background-color: #1d1f21;
}
.posts_display {
  background-color: #1d1f21;
  color: #c9cacc;
}
.posts_draft-message {
 background-color: #1d1f21;
}
.editor_main > div.editor_display {
  background-color: #1d1f21;
  color: gray;
}
.CodeMirror.cm-s-default.CodeMirror-wrap {
  background-color: #1d1f21;
  color: #2bbc8a;
}
.editor_top .editor_title {
  background-color: black;
  color: #2bbc8a;
}
.editor_top button {
  color: #2bbc8a;
}
.cm-s-default .cm-header {
  color: #2bbc8a;
}
.cm-s-default .cm-builtin {
  color: #2bbc8a;
}
.cm-s-default .cm-attribute {
  color: #2bbc8a;
}
.cm-s-default .cm-variable-2 {
  color: #c9cacc;
}
.cm-s-default .cm-link {
  color: #2bbc8a;
}
.cm-s-default .cm-def {
  color: #2bbc8a;
}
.cm-s-default .cm-atom {
  color: #2bbc8a;
}
```