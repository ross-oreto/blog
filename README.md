#### Nexo blog with dark cactus theme using a custom deployer
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