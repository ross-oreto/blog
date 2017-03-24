#### Nexo blog with dark cactus theme using a custom deployer
 - in project root
```
$ npm install hexo-cli -g
$ npm install
$ hexo server
```

##### To create a new post or a new page, you can run the following command:
``` 
$ hexo new [layout] <title>
```

#####  Deploy After Generating
``` 
$ hexo generate --deploy
``` 

##### hexo-deployer-gitback
 - deploys source file generated to the git blog repo and to the git repo for the generated site.