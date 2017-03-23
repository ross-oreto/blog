#### Nexo blog with dark cactus theme
 - in project root
```
$ npm install hexo-cli -g
$ npm install
$ hexo server
```

##### hexo-editor
```
git clone https://github.com/tajpure/hexo-editor.git
cd hexo-editor
npm install --production
npm start
```

##### To create a new post or a new page, you can run the following command:
``` 
$ hexo new [layout] <title>
```

#####  Deploy After Generating
``` 
$ hexo generate --deploy
``` 

##### update the cactus dark theme
```
$ git remote add -f cactus-dark https://github.com/probberechts/cactus-dark.git
$ git subtree add --prefix themes/cactus-dark cactus-dark master --squash

git subtree pull --prefix themes/cactus-dark https://github.com/probberechts/cactus-dark.git --squash master
```