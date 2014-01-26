Ultimate quiz!
--------------
Just another FGJ2014 game

License:
-----
Creative Commons (see license.txt)

Authors:
-----
Christoffer Niska - Code
Jesse Luoto -  Code
Goran Maconi - Graphics and animation
Ari Huotari - Graphics and animation
Ville Touronen - Sound and music


Installation:
-----

- Install node npm and global grunt
- Run `npm install` on folders `client/` and `server/`
- Run `grunt concat less` on `client/`
- Run `node server/app.js`
- All done! The game runs on http://localhost:8000/

Test data:
```
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Bat&answers[]=Butterfly&answers[]=Moth&src=/game/img/questionimages/Rorschach_blot_01.jpg&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Two humans&answers[]=Dog&answers[]=Elephant&answers[]=Bear&src=/game/img/questionimages/Rorschach_blot_02.jpg&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Hideout&answers[]=Skin&answers[]=Rug&src=/game/img/questionimages/Rorschach_blot_04.jpg&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Bat&answers[]=Butterfly&answers[]=Moth&src=/game/img/questionimages/Rorschach_blot_05.jpg&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Hideout&answers[]=Skin&answers[]=Rug&src=/game/img/questionimages/Rorschach_blot_06.jpg&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Crab&answers[]=Lobster&answers[]=Spider&answers[]=Rabbit&src=/game/img/questionimages/Rorschach_blot_10.jpg&type=image

http://localhost:8000/api/question?question=What does the dragon think%3F&answers[]=I'm gonna burn down that village and eat all the humans!&answers[]=Gold, preciousss...&answers[]=Roaaaaargh!&answers[]=The troll I ate gives me gas.&src=/game/img/questionimages/dragon3.png&type=image
http://localhost:8000/api/question?question=What is this%3F&answers[]=A flock of birds&answers[]=A flock of butterflies&answers[]=Leaves in the wind&answers[]=Lots of wasps! Eeeek!&src=/game/img/questionimages/parvi.png&type=image
http://localhost:8000/api/question?question=What are these%3F&answers[]=Two straws&answers[]=Light sabers. Swooosh!&answers[]=Party lights. Party party!!&answers[]=Laser beams from alien ships.&src=/game/img/questionimages/lights.png&type=image
http://localhost:8000/api/question?question=Why am I angry%3F&answers[]=The little bird is pecking my ear.&answers[]=It's so damn cold!&answers[]=Neighbor's kids egged my window.&answers[]=I'm not angry. I'm happy.&src=/game/img/questionimages/mummeli3.png&type=image
http://localhost:8000/api/question?question=What is this alien going to say to you%3F&answers[]=Human, take me to your leader.&answers[]=I came to suck your brains.&answers[]=I bring a message of love and hope.&answers[]=I came here to take your job.&src=/game/img/questionimages/alien2.png&type=image
http://localhost:8000/api/question?question=What is in this picture%3F&answers[]=A lonely looking place.&answers[]=A day dawning somewhere in the world.&answers[]=Earth, space and stars.&answers[]=Sparkles raining on the sea.&src=/game/img/questionimages/earth.png&type=image
http://localhost:8000/api/question?question=U MAD BRO?%3F&answers[]=YES!!!&answers[]=Yes!&answers[]=Yes.&answers[]=Wait, what?&src=/game/img/questionimages/umad.gif&type=image

http://localhost:8000/api/question?question=What do you see%3F&answers[]=Bat&answers[]=Warrior Princess with Wings&answers[]=Mask&answers[]=Mooseagle&src=/game/img/questionimages/butterfly_something.png&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=Bat&answers[]=Dwarf andgel&answers[]=Dude on a hoverboard&answers[]=Viking! Yarr!&src=/game/img/questionimages/gangsta_crow.png&type=image
http://localhost:8000/api/question?question=Which car will win the race%3F&answers[]=Orange Lightning&answers[]=Green Ladybug&answers[]=Blood Thick Red&answers[]=Sunshine Yellow&src=/game/img/questionimages/cars_anim.gif&type=image
http://localhost:8000/api/question?question=Cookies are best for...&answers[]=Brakfast&answers[]=Lunch&answers[]=Supper&answers[]=Dinner&src=/game/img/questionimages/cookies.gif&type=image
http://localhost:8000/api/question?question=What is he listening%3F&answers[]=Heavy Metal&answers[]=Beethoven&answers[]=Dubstep&answers[]=Lauri Tähkä&src=/game/img/questionimages/headphone_animation.gif&type=image
http://localhost:8000/api/question?question=Which snake could kill you%3F&answers[]=Red snake&answers[]=Yellow anke&answers[]=Blue snake&answers[]=Green snake&src=/game/img/questionimages/snakes_anim.gif&type=image
http://localhost:8000/api/question?question=R U MAD%3F&answers[]=Yes?&answers[]=YES!&answers[]=Yes...&answers[]=Yes&src=/game/img/questionimages/umad.gif&type=image

http://localhost:8000/api/question?question=What is my name%3F&answers[]=Tommy&answers[]=Tony&answers[]=Tom&answers[]=Jabba&src=/game/img/questionimages/tomato.gif&type=image
http://localhost:8000/api/question?question=I am..&answers[]=An evil elf.&answers[]=A powerful wizard.&answers[]=A dark sorcerer.&answers[]=A fairy king.&src=/game/img/questionimages/evil.png&type=image
http://localhost:8000/api/question?question=What do you see%3F&answers[]=A seashell.&answers[]=An alien face.&answers[]=A fossile.&answers[]=A guy getting beaten.&src=/game/img/questionimages/outo.gif&type=image

http://localhost:8000/api/question?question=What happened?%3F&answers[]=The snake got dinner&answers[]=OMG! A rabbit got killed!&answers[]=Nature happened. That's what.&answers[]=Omnomnomonom.&src=/game/img/questionimages/snake_anim.gif&type=image
```
