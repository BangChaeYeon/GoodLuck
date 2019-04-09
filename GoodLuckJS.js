window.onload = init;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var checkCard = new Array(5);
var player = new Array(5);
var computer = new Array(5);
var select = [];
var selectCom = [];
var card = ["Dia01", "Dia02", "Dia03", "Dia04", "Dia05", "Dia06", "Dia07", "Dia08", "Dia09", "Dia10", "Dia11", "Dia12", "Dia13",
            "Clv01", "Clv02", "Clv03", "Clv04", "Clv05", "Clv06", "Clv07", "Clv08", "Clv09", "Clv10", "Clv11", "Clv12", "Clv13",
            "Hrt01", "Hrt02", "Hrt03", "Hrt04", "Hrt05", "Hrt06", "Hrt07", "Hrt08", "Hrt09", "Hrt10", "Hrt11", "Hrt12", "Hrt13",
            "Spd01", "Spd02", "Spd03", "Spd04", "Spd05", "Spd06", "Spd07", "Spd08", "Spd09", "Spd10", "Spd11", "Spd12", "Spd13"];
var vol = 0.5;
var audio, effectSound;
var bg = true, effect = true;
var score, scoreCom;
var settingBtn, ruleBtn;
var shuffle;
var playerCard1, playerCard2, playerCard3, playerCard4, playerCard5;
var computerCard1, computerCard2, computerCard3, computerCard4, computerCard5;
var onepair1, flush1, twopairs1, highcard1, triple1, quads1, fullhouse1, straight1, straightflush1;
var onepair2, flush2, twopairs2, highcard2, triple2, quads2, fullhouse2, straight2, straightflush2;

function init(){
    
    var rule = document.getElementById("rule");
    var start = document.getElementById("start");
    var setUp = document.getElementById("setUp");

    shuffle = document.getElementById("shuffle");
    settingBtn = document.getElementById("settingBtn");
    ruleBtn = document.getElementById("ruleBtn");

    playerCard1 = document.getElementById("playerCard1");
    playerCard2 = document.getElementById("playerCard2");
    playerCard3 = document.getElementById("playerCard3");
    playerCard4 = document.getElementById("playerCard4");
    playerCard5 = document.getElementById("playerCard5");
    computerCard1 = document.getElementById("computerCard1");
    computerCard2 = document.getElementById("computerCard2");
    computerCard3 = document.getElementById("computerCard3");
    computerCard4 = document.getElementById("computerCard4");
    computerCard5 = document.getElementById("computerCard5");

    onepair1 = document.getElementById("onepair1");
    flush1 = document.getElementById("flush1");
    twopairs1 = document.getElementById("twopairs1");
    highcard1 = document.getElementById("highcard1");
    triple1 = document.getElementById("triple1");
    quads1 = document.getElementById("quads1");
    fullhouse1 = document.getElementById("fullhouse1");
    straight1 = document.getElementById("straight1");
    straightflush1 = document.getElementById("straightflush1");
    onepair2 = document.getElementById("onepair2");
    triple2 = document.getElementById("triple2");
    flush2 = document.getElementById("flush2");
    twopairs2 = document.getElementById("twopairs2");
    highcard2 = document.getElementById("highcard2");
    quads2 = document.getElementById("quads2");
    fullhouse2 = document.getElementById("fullhouse2");
    straight2 = document.getElementById("straight2");
    straightflush2 = document.getElementById("straightflush2");

    var background = new Image();
    var title = new Image();

    background.src = "img/bg.png";
    title.src = "img/title.png";

    score = 0;
    scoreCom = 0;

    // 배경화면을 canvas에 올려줌
    background.onload = function(){
        ctx.drawImage(background, 0, 0);
        ctx.drawImage(title, 170, 100);
    }

    rule.addEventListener("click", OpenRule, false); // rule 버튼 클릭 이벤트
    start.addEventListener("click", GameStart, false); // start 버튼 클릭 이벤트
    setUp.addEventListener("click", OpenSetting, false); // setting 버튼 클릭 이벤트

    Music(vol);
}

function Music(vol){ // 음악 재생 / 일시 정지 / 볼륨 조절
    audio = document.getElementById("audio");
    effectSound = document.getElementById("effect");

    audio.volume = vol;
    effectSound.volume = vol;

    if(bg == true) audio.play();
    else audio.pause();
    
}

function GameStart(){ // start 버튼 누를 시 실행
    var gamebg = document.getElementById("gamebg");
    gamebg.style.visibility = "visible";
    gamebg.style.zIndex = "1";

    settingBtn.style.visibility = "visible";
    settingBtn.style.zIndex = "1";

    ruleBtn.style.visibility = "visible";
    ruleBtn.style.zIndex = "1";

    computerCard1.src = "img/trump/trump.png";
    computerCard2.src = "img/trump/trump.png";
    computerCard3.src = "img/trump/trump.png";
    computerCard4.src = "img/trump/trump.png";
    computerCard5.src = "img/trump/trump.png";

    // 설정 아이콘 누를 시 실행
    settingBtn.addEventListener("click", OpenSetting, false);
    // 물음표 아이콘 누를 시 실행
    ruleBtn.addEventListener("click", OpenRule, false);

    ShareCard();
}

function ShareCard(){ // 카드를 랜덤으로 플레이어와 컴퓨터에게 분배함
    var bool = false;

    do{
        bool = false;
        for(var i = 0; i < 10; i++){
            var cardNum = Math.floor(Math.random() * 52);
            if(i < 5)
                computer[i] = card[cardNum];
            else
                player[i - 5] = card[cardNum];
        }

        for(var i = 0; i < player.length; i++){
            for(var j = 0; j < computer.length; j++){
                if(player[i] === computer[j]){
                    bool = true;
                    break;
                }

                if(player[i] === player[j]){
                    if(i != j){
                        bool = true;
                        break;
                    }
                }

                if(computer[i] === computer[j]){
                    if(i != j){
                        bool = true;
                        break;
                    }
                }
            }
        }
    }while(bool);

    DrawCard();
}

function DrawCard(){ // 카드를 보여줌
    
    var deck = document.getElementById("deck");
    f1 = 0, f2 = 0, f3 = 0, f4 = 0, f5 = 0;

    playerCard1.style.visibility = "visible";
    playerCard2.style.visibility = "visible";
    playerCard3.style.visibility = "visible";
    playerCard4.style.visibility = "visible";
    playerCard5.style.visibility = "visible";
    computerCard1.style.visibility = "visible";
    computerCard2.style.visibility = "visible";
    computerCard3.style.visibility = "visible";
    computerCard4.style.visibility = "visible";
    computerCard5.style.visibility = "visible";
    deck.style.visibility = "visible";

    playerCard1.style.zIndex = "1";
    playerCard2.style.zIndex = "1";
    playerCard3.style.zIndex = "1";
    playerCard4.style.zIndex = "1";
    playerCard5.style.zIndex = "1";
    computerCard1.style.zIndex = "1";
    computerCard2.style.zIndex = "1";
    computerCard3.style.zIndex = "1";
    computerCard4.style.zIndex = "1";
    computerCard5.style.zIndex = "1";
    deck.style.zIndex = "1";

    playerCard1.src = "img/trump/"+player[0]+".png";
    playerCard2.src = "img/trump/"+player[1]+".png";
    playerCard3.src = "img/trump/"+player[2]+".png";
    playerCard4.src = "img/trump/"+player[3]+".png";
    playerCard5.src = "img/trump/"+player[4]+".png";

    ShowCard();
    SettingCard();
}

function SettingCard(){ // 현재 플레이어가 가지고 있는 카드덱이 무엇인지 보여줌
    var onePair = 0, flush = 0, straight = 0;
    var triple = false, highCard = true, quads = false, fullHouse = false;;
    var str = [];
    var num = [];
    score = 0;

    onepair2.style.zIndex = "-1";
    flush2.style.zIndex = "-1";
    twopairs2.style.zIndex = "-1";
    triple2.style.zIndex = "-1";
    highcard2.style.zIndex = "-1";
    quads2.style.zIndex = "-1";
    fullhouse2.style.zIndex = "-1";
    straight2.style.zIndex = "-1";
    straightflush2.style.zIndex = "-1";

    for(var i = 0; i < 5; i++){
        num[i] = Number(player[i].slice(3, 5));
    }

    for(var i = 0; i < 5; i++){
        str[i] = player[i].slice(0, 3);
    }

    // One pair
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(num[i] === num[j]){
                if(i != j)
                    onePair++;
            }
        }
    }

    if(onePair == 2 && triple == false) {
        onepair2.style.zIndex = "1";
        score = 1;
        highCard = false;
    }

    // Two pairs
    if(onePair == 4 && triple == false) {
        twopairs2.style.zIndex = "1";
        score = 2;
        highCard = false;
    }

    // Triple
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            for(var k = 0; k < 5; k++){
                if(num[i] === num[j] && num[i] === num[k] && num[k] === num[j]){
                    if(i != j && i != k && j != k)
                        triple = true;
                }
            }
        }
    }

    if(triple == true && onePair == 6){
        triple2.style.zIndex = "1";
        score = 3;
        highCard = false;
    }

    // Flush
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(str[i] == str[j]){
                flush++;
            }
            else break;
        }
    }

    if(flush == 25 && straight == 0) {
        flush2.style.zIndex = "1";
        score = 4;
        highCard = false;
    }

    // Straight
    var temp;
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(num[i] < num[j]){
                temp = num[i];
                num[i] = num[j];
                num[j] = temp;
            }
        }
    }

    for(var i = 0; i < 5; i++){
        if(num[i] + 1 == num[i + 1]){
            straight++;
        }
        if(num[i] == 13){
            if(num[i] - 12 == num[0])
                straight++;
        }
    }

    if(straight == 4 && flush != 25){
        straight2.style.zIndex = "1";
        score = 5;
        highCard = false;
    }

    // Quads
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            for(var k = 0; k < 5; k++){
                for(var l = 0; l < 5; l++){
                    if(num[i] === num[j] && num[i] === num[k] && num[k] === num[j]
                    && num[i] === num[l] && num[j] === num[l] && num[k] === num[l]){
                        if(i != j && i != k && j != k && i != l && j != l && k != l)
                        quads = true;
                    }
                }
            }
        }
    }

    if(quads == true && flush != 25){
        quads2.style.zIndex = "1";
        score = 7;
        highCard = false;
    }

    // Full house
    if(onePair == 8 && triple == true && flush != 25) {
        fullhouse2.style.zIndex = "1";
        score = 6;
        fullHouse = true;
        highCard = false;
    }

    // Straight flush
    if(straight == 4 && flush == 25){
        straightflush2.style.zIndex = "1";
        highCard = false;
        score = 8;
    }

    // High Card
    if(highCard == true) {
        highcard2.style.zIndex = "1";
    }
}

function ShowCard(){ // 카드 클릭시 이벤트 (테두리, 효과음)

    var result = document.getElementById("result");
    effectSound = document.getElementById("effect");

    playerCard1.onmousedown = function(){
        if(f1 == 0){
            playerCard1.style.border = "3px solid yellow";
            f1 = 1;
            select[0] = true;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
        else {
            playerCard1.style.border = "none";
            f1 = 0;
            select[0] = false;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
    }

    playerCard2.onmousedown = function(){
        if(f2 == 0){
            playerCard2.style.border = "3px solid yellow";
            f2 = 1;
            select[1] = true;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
        else {
            playerCard2.style.border = "none";
            f2 = 0;
            select[1] = false;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
    }

    playerCard3.onmousedown = function(){
        if(f3 == 0){
            playerCard3.style.border = "3px solid yellow";
            f3 = 1;
            select[2] = true;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
        else {
            playerCard3.style.border = "none";
            f3 = 0;
            select[2] = false;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
    }

    playerCard4.onmousedown = function(){
        if(f4 == 0){
            playerCard4.style.border = "3px solid yellow";
            f4 = 1;
            select[3] = true;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
        else {
            playerCard4.style.border = "none";
            f4 = 0;
            select[3] = false;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
    }

    playerCard5.onmousedown = function(){
        if(f5 == 0){
            playerCard5.style.border = "3px solid yellow";
            f5 = 1;
            select[4] = true;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
        else {
            playerCard5.style.border = "none";
            f5 = 0;
            select[4] = false;
            if(effect == true)effectSound.play();
            ShuffleCard();
        }
    }
}

function ShuffleCard(){ // 선택한 카드를 다시 랜덤으로 지정해줌

    var j = 0;

    for(var i = 0; i < 5; i++){
        if(select[i] !== null){
            shuffle.style.visibility = "visible";
            shuffle.style.zIndex = "1";
            j++;
        }

        if(j === 0){
            shuffle.style.visibility = "hidden";
            shuffle.style.zIndex = "-1";
        }
    }
        
    shuffle.addEventListener("click", function(){

        result.style.visibility = "visible";
        result.style.zIndex = "1";
        shuffle.style.visibility = "hidden";

        SettingComCard();
        ChangeCard();

    }, false);

    result.addEventListener("click", function(){
        ShowResult();
    }, false);
}

function ChangeCard(){ // 셔플한 카드가 겹치지 않는지 확인해줌
    var bool = false;
    for(var k = 0; k < 5; k++){
        if(select[k]){
            do{
                bool = false;
                var cardNum = Math.floor(Math.random() * 52);
                player[k] = card[cardNum];

                for(var i = 0; i < player.length; i++){
                    for(var j = 0; j < computer.length; j++){
                        if(player[i] === computer[j]){
                            bool = true;
                            break;
                        }

                        if(player[i] === player[j]){
                            if(i != j){
                                bool = true;
                                break;
                            }
                        }

                        if(computer[i] === computer[j]){
                            if(i != j){
                                bool = true;
                                break;
                            }
                        }
                    }
                }
            }while(bool);
        } // end of if
    } // end of for
    CheckComputer();
    DrawCard();
    select = [false, false, false, false, false];
}

function ShowResult(){ // result 버튼을 누를 시에 결과를 보여줌

    var deck = document.getElementById("deck");
    var result = document.getElementById("result");

    var win = document.getElementById("win");
    var draw = document.getElementById("draw");
    var defeat = document.getElementById("defeat");
    var restart = document.getElementById("restart");
    var resultbtn = document.getElementById("resultbtn");

    settingBtn.style.visibility = "hidden";
    ruleBtn.style.visibility = "hidden";

    settingBtn.style.zIndex = "-1";
    ruleBtn.style.zIndex = "-1";

    playerCard1.style.visibility = "hidden";
    playerCard2.style.visibility = "hidden";
    playerCard3.style.visibility = "hidden";
    playerCard4.style.visibility = "hidden";
    playerCard5.style.visibility = "hidden";
    computerCard1.style.visibility = "hidden";
    computerCard2.style.visibility = "hidden";
    computerCard3.style.visibility = "hidden";
    computerCard4.style.visibility = "hidden";
    computerCard5.style.visibility = "hidden";
    deck.style.visibility = "hidden";
    shuffle.style.visibility = "hidden";
    result.style.visibility = "hidden";

    onepair1.style.visibility = "visible";
    flush1.style.visibility = "visible";
    twopairs1.style.visibility = "visible";
    highcard1.style.visibility = "visible";
    triple1.style.visibility = "visible";
    quads1.style.visibility = "visible";
    fullhouse1.style.visibility = "visible";
    straight1.style.visibility = "visible";
    straightflush1.style.visibility = "visible";
    onepair2.style.visibility = "visible";
    flush2.style.visibility = "visible";
    twopairs2.style.visibility = "visible";
    highcard2.style.visibility = "visible";
    triple2.style.visibility = "visible";
    quads2.style.visibility = "visible";
    fullhouse2.style.visibility = "visible";
    straight2.style.visibility = "visible";
    straightflush2.style.visibility = "visible";
    resultbtn.style.visibility = "visible";

    playerCard1.style.border = "none";
    playerCard2.style.border = "none";
    playerCard3.style.border = "none";
    playerCard4.style.border = "none";
    playerCard5.style.border = "none";

    resultbtn.style.zIndex = "3"

    win.style.zIndex = "-1";
    draw.style.zIndex = "-1";
    defeat.style.zIndex = "-1";

    resultbtn.addEventListener("click", function(){
        resultbtn.style.visibility = "hidden";
        resultbtn.style.zIndex = "-1"
        restart.style.visibility = "visible";
        restart.style.zIndex = "5";

        onepair1.style.visibility = "hidden";
        flush1.style.visibility = "hidden";
        twopairs1.style.visibility = "hidden";
        triple1.style.visibility = "hidden";
        highcard1.style.visibility = "hidden";
        quads1.style.visibility = "hidden";
        fullhouse1.style.visibility = "hidden";
        straight1.style.visibility = "hidden";
        straightflush1.style.visibility = "hidden";
        onepair2.style.visibility = "hidden";
        flush2.style.visibility = "hidden";
        twopairs2.style.visibility = "hidden";
        triple2.style.visibility = "hidden";
        highcard2.style.visibility = "hidden";
        quads2.style.visibility = "hidden";
        fullhouse2.style.visibility = "hidden";
        straight2.style.visibility = "hidden";
        straightflush2.style.visibility = "hidden";

        onepair1.style.zIndex = "-1";
        flush1.style.zIndex = "-1";
        twopairs1.style.zIndex = "-1";
        triple1.style.zIndex = "-1";
        highcard1.style.zIndex = "-1";
        quads1.style.zIndex = "-1";
        fullhouse1.style.zIndex = "-1";
        straight1.style.zIndex = "-1";
        straightflush1.style.zIndex = "-1";
        onepair2.style.zIndex = "-1";
        flush2.style.zIndex = "-1";
        twopairs2.style.zIndex = "-1";
        triple2.style.zIndex = "-1";
        highcard2.style.zIndex = "-1";
        quads2.style.zIndex = "-1";
        fullhouse2.style.zIndex = "-1";
        straight2.style.zIndex = "-1";
        straightflush2.style.zIndex = "-1";

        // 승리, 무승부, 패배 화면을 보여줌

        if(score > scoreCom){
            win.style.visibility = "visible";
            win.style.zIndex = "1";
        }
        else if(score == scoreCom){
            draw.style.visibility = "visible";
            draw.style.zIndex = "1";
        }
        else{
            defeat.style.visibility = "visible";
            defeat.style.zIndex = "1";
        }
    }, false);

    // restart 버튼을 누를 시 게임을 다시 시작함
    restart.addEventListener("click", function(){
        win.style.visibility = "hidden";
        win.style.zIndex = "-1";
        draw.style.visibility = "hidden";
        draw.style.zIndex = "-1";
        defeat.style.visibility = "hidden";
        defeat.style.zIndex = "-1";
        restart.style.visibility = "hidden";
        restart.style.zIndex = "-1";

        GameStart();
    }, false);
}

function OpenRule(){ // 게임 규칙 설명창을 열어줌
    var rp1 = document.getElementById("rp1");
    rp1.style.visibility = "visible";
    rp1.style.zIndex = "2";

    var rp2 = document.getElementById("rp2");
    rp2.style.visibility = "visible";
    rp2.style.zIndex = "1";

    var rpbtn1 = document.getElementById("rpbtn1");
    rpbtn1.style.visibility = "visible";
    rpbtn1.style.zIndex = "2";

    var rpbtn2 = document.getElementById("rpbtn2");
    rpbtn2.style.zIndex = "2";

    var rpc = document.getElementById("rpc");
    rpc.style.visibility = "visible";
    rpc.style.zIndex = "3";

    rpc.addEventListener("click", CloseRule, false);
    rpbtn1.addEventListener("click", function(){
        rp2.style.zIndex = "2";
        rp1.style.zIndex = "1";
        rpbtn1.style.visibility = "hidden";
        rpbtn2.style.visibility = "visible";
    }, false);
    rpbtn2.addEventListener("click", function(){
        rp1.style.zIndex = "2";
        rp2.style.zIndex = "1";
        rpbtn2.style.visibility = "hidden";
        rpbtn1.style.visibility = "visible";
    }, false);
}

function CloseRule(){ // 게임 규칙 설명창을 닫아줌
    var rp1 = document.getElementById("rp1");
    rp1.style.visibility = "hidden";
    rp1.style.zIndex = "-1";

    var rp2 = document.getElementById("rp2");
    rp2.style.visibility = "hidden";
    rp2.style.zIndex = "-1";

    var rpbtn1 = document.getElementById("rpbtn1");
    rpbtn1.style.visibility = "hidden";
    rpbtn1.style.zIndex = "-1";

    var rpbtn2 = document.getElementById("rpbtn2");
    rpbtn2.style.visibility = "hidden";
    rpbtn2.style.zIndex = "-1";

    var rpc = document.getElementById("rpc");
    rpc.style.visibility = "hidden";
    rpc.style.zIndex = "-1";
}

function OpenSetting(){ // 설정창을 열어줌
    var sp = document.getElementById("sp");
    sp.style.visibility = "visible";
    sp.style.zIndex = "2";

    var spc = document.getElementById("spc");
    spc.style.visibility = "visible";
    spc.style.zIndex = "2";

    var onBg = document.getElementById("onBg");
    onBg.style.visibility = "visible";
    if(bg != false) onBg.style.zIndex = "3";
    else onBg.style.zIndex = "2";

    var offBg = document.getElementById("offBg");
    offBg.style.visibility = "visible";
    if(bg != true) offBg.style.zIndex = "3";
    else offBg.style.zIndex = "2";    

    var onEffect = document.getElementById("onEffect");
    onEffect.style.visibility = "visible";
    if(effect != false) onEffect.style.zIndex = "3";
    else onEffect.style.zIndex = "2";

    var offEffect = document.getElementById("offEffect");
    offEffect.style.visibility = "visible";
    if(effect != true) offEffect.style.zIndex = "3";
    else offEffect.style.zIndex = "2";   

    var slider = document.getElementById("slider");
    slider.style.visibility = "visible";
    slider.style.zIndex = "2";

    spc.addEventListener("click", CloseSetting, false);
    onBg.addEventListener("click", function(){
        bg = false;
        onBg.style.zIndex = "1";
        offBg.style.zIndex = "3";
        Music(vol);
    }, false);
    offBg.addEventListener("click", function(){
        bg = true;
        onBg.style.zIndex = "3";
        offBg.style.zIndex = "1";
        Music(vol);
    }, false);
    onEffect.addEventListener("click", function(){
        effect = false;
        onEffect.style.zIndex = "1";
        offEffect.style.zIndex = "3";
        Music(vol);
    }, false);
    offEffect.addEventListener("click", function(){
        effect = true;
        onEffect.style.zIndex = "3";
        offEffect.style.zIndex = "1";
        Music(vol);
    }, false);
}

function CloseSetting(){ // 설정창을 닫아줌
    var sp = document.getElementById("sp");
    sp.style.visibility = "hidden";
    sp.style.zIndex = "-1";

    var spc = document.getElementById("spc");
    spc.style.visibility = "hidden";
    spc.style.zIndex = "-1";

    var slider = document.getElementById("slider");
    slider.style.visibility = "hidden";
    slider.style.zIndex = "-1";

    var onBg = document.getElementById("onBg");
    onBg.style.visibility = "hidden";
    onBg.style.zIndex = "-1";

    var offBg = document.getElementById("offBg");
    offBg.style.visibility = "hidden";
    offBg.style.zIndex = "-1";

    var onEffect = document.getElementById("onEffect");
    onEffect.style.visibility = "hidden";
    onEffect.style.zIndex = "-1";

    var offEffect = document.getElementById("offEffect");
    offEffect.style.visibility = "visible";
    offEffect.style.zIndex = "-1";
}

function CheckComputer(){ // 컴퓨터가 바꿀 카드를 랜덤으로 선택해줌

    var bool;

    for(var i = 0; i < 5; i++){
        bool = Math.round(Math.random());
        if(bool == 0)
            selectCom[i] = false;
        else selectCom[i] = true;
    }

    ChangeComputerCard();
}


function ChangeComputerCard(){ // 컴퓨터가 선택한 카드를 현재 덱과 겹치지 않게 바꿔줌
    var bool = false;
    for(var k = 0; k < 5; k++){
        if(selectCom[k]){
            do{
                bool = false;
                var cardNum = Math.floor(Math.random() * 52);
                computer[k] = card[cardNum];

                for(var i = 0; i < player.length; i++){
                    for(var j = 0; j < computer.length; j++){
                        if(player[i] === computer[j]){
                            bool = true;
                            break;
                        }

                        if(player[i] === player[j]){
                            if(i != j){
                                bool = true;
                                break;
                            }
                        }

                        if(computer[i] === computer[j]){
                            if(i != j){
                                bool = true;
                                break;
                            }
                        }
                    }
                }
            }while(bool);
        } // end of if
    } // end of for

    DrawCard();
    selectCom = [false, false, false, false, false];
}

function SettingComCard(){ // 컴퓨터가 가지고 있는 카드덱이 무엇인지 표시해줌
    var onePairCom = 0, flushCom = 0, straightCom = 0;
    var tripleCom = false, highCardCom = true, quadsCom = false, fullHouseCom = false;
    var strCom = [null];
    var numCom = [null];
    scoreCom = 0;

    onepair1.style.zIndex = "-1";
    flush1.style.zIndex = "-1";
    twopairs1.style.zIndex = "-1";
    triple1.style.zIndex = "-1";
    highcard1.style.zIndex = "-1";
    quads1.style.zIndex = "-1";
    fullhouse1.style.zIndex = "-1";
    straight1.style.zIndex = "-1";
    straightflush1.style.zIndex = "-1";

    computerCard1.src = "img/trump/"+computer[0]+".png";
    computerCard2.src = "img/trump/"+computer[1]+".png";
    computerCard3.src = "img/trump/"+computer[2]+".png";
    computerCard4.src = "img/trump/"+computer[3]+".png";
    computerCard5.src = "img/trump/"+computer[4]+".png";

    for(var i = 0; i < 5; i++){
        if(computer[i] != null)
            numCom[i] = Number(computer[i].slice(3, 5));
    }

    for(var i = 0; i < 5; i++){
        if(computer[i] != null)
            strCom[i] = computer[i].slice(0, 3);
    }

    // One pair
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(numCom[i] === numCom[j]){
                if(i != j)
                    onePairCom++;
            }
        }
    }

    if(onePairCom == 2 && tripleCom == false) {
        onepair1.style.zIndex = "1";
        scoreCom = 1;
        highCardCom = false;
    }

    // Two pairs
    if(onePairCom == 4 && tripleCom == false) {
        twopairs1.style.zIndex = "1";
        scoreCom = 2;
        highCardCom = false;
    }

    // Triple
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            for(var k = 0; k < 5; k++){
                if(numCom[i] === numCom[j] && numCom[i] === numCom[k] && numCom[k] === numCom[j]){
                    if(i != j && i != k && j != k)
                        tripleCom = true;
                }
            }
        }
    }

    if(tripleCom == true && onePairCom == 6){
        triple1.style.zIndex = "1";
        scoreCom = 3;
        highCardCom = false;
    }


    // Flush
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(strCom[i] == strCom[j]){
                flushCom++;
            }
            else break;
        }
        
    }
    if(flushCom == 25 && straightCom == 0) {
        flush1.style.zIndex = "1";
        scoreCom = 4;
        highCardCom = false;
    }

    // Straight
    var temp;
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(numCom[i] < numCom[j]){
                temp = numCom[i];
                numCom[i] = numCom[j];
                numCom[j] = temp;
            }
        }
    }

    for(var i = 0; i < 5; i++){
        if(numCom[i] + 1 == numCom[i + 1]){
            straightCom++;
        }
        if(numCom[4] == 13){
            if(numCom[4] - 12 == numCom[0])
                straightCom++;
        }
    }

    if(straightCom == 4 && flushCom != 25){
        straight1.style.zIndex = "1";
        scoreCom = 5;
        highCardCom = false;
    }

    // Quads
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            for(var k = 0; k < 5; k++){
                for(var l = 0; l < 5; l++){
                    if(numCom[i] === numCom[j] && numCom[i] === numCom[k] && numCom[k] === numCom[j]
                    && numCom[i] === numCom[l] && numCom[j] === numCom[l] && numCom[k] === numCom[l]){
                        if(i != j && i != k && j != k && i != l && j != l && k != l)
                        quadsCom = true;
                    }
                }
            }
        }
    }

    if(quadsCom == true && flushCom != 25){
        quads1.style.zIndex = "1";
        scoreCom = 7;
        highCardCom = false;
    }

    // Full house
    if(onePairCom == 8 && tripleCom == true && flushCom != 25) {
        fullhouse1.style.zIndex = "1";
        scoreCom = 6;
        fullHouseCom = true;
        highCardCom = false;
    }

    // Straight flush
    if(straightCom == 4 && flushCom == 25){
        straightflush1.style.zIndex = "1";
        highCardCom = false;
        scoreCom = 8;
    }

    // High Card
    if(highCardCom == true){
        highcard1.style.zIndex = "1";
    }
}