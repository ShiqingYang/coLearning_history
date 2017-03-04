(function ($) {
    $.fn.jquizzy = function (settings) {
        var defaults = {
            questions: null,
            startImg: 'images/start.gif',
            endText: '已结束!',
            shortURL: null,
            sendResultsURL: null,
        };
        var config = $.extend(defaults, settings);
        if (config.questions === null) {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
            return;
        }
        var superContainer = $(this),
            answers = [],
            introFob = '	<div class="intro-container slide-container"><a class="nav-start" href="#">请认真完成测试题。准备好了吗？<br/><br/><span><img src="' + config.startImg + '"></span></a></div>	',
            exitFob = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="result-keeper"></div></div><div class="notice">请选择一个选项！</div><div class="progress-keeper" ><div class="progress"></div></div>',
            contentFob = '',
            questionsIteratorIndex,
            answersIteratorIndex;
        superContainer.addClass('main-quiz-holder');
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }
            contentFob += '</ul><div class="nav-container">';
            if (questionsIteratorIndex !== 0) {
                contentFob += '<div class="prev"><a class="nav-previous" href="#">&lt; 上一题</a></div>';
            }
            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#">下一题 &gt;</a></div>';
            } else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#">完成</a></div>';
            }
            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].answers);
        }
        //console.log(answers[1]);
        superContainer.html(introFob + contentFob + exitFob);
        var progress = superContainer.find('.progress'),
            progressKeeper = superContainer.find('.progress-keeper'),
            notice = superContainer.find('.notice'),
            progressWidth = progressKeeper.width(),
            userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');
            //console.log(answers[0]);
        
        function checkAnswers() {
            var resultArr = [];
            for (i = 0; i < config.questions.length; i++) {
                resultArr.push(userAnswers[i]);
                //alert(resultArr[i]);
            }
            //console.log(resultArr.length);
            return resultArr;

        }

        function roundReloaded(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        progressKeeper.hide();
        notice.hide();
        slidesList.hide().first().fadeIn(500);
        superContainer.find('li').click(function () {
            var thisLi = $(this);
            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');
            }
        });
        superContainer.find('.nav-start').click(function () {
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).next().fadeIn(500);
                    progressKeeper.fadeIn(500);
                });
            return false;
        });
        superContainer.find('.next').click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).next().fadeIn(500);
                });
            progress.animate({
                    width: progress.width() + Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        superContainer.find('.prev').click(function () {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).prev().fadeIn(500);
                });
            progress.animate({
                    width: progress.width() - Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        superContainer.find('.final').click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                //console.log("final");
                return false;
            }
            superContainer.find('li.selected').each(function (index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            
            progressKeeper.hide();
            var results = checkAnswers(),
                resultSet = '',
                trueCount = 1,
                score,
                score1 = 0,
                score2 = 0,
                score3 = 0,
                score4 = 0,
                url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            }
            /// 胆汁质,包括2,6,9,14,17,21,27,31,36,38,42,48,50,54,58各题；
            /// 多血质,包括4,8,11,16,19,23,25,29,34,40,44,46,52,56,60各题；
            /// 粘液质,包括1,7,10,13,18,22,26,30,33,39,43,45,49,55,57各题；
            /// 抑郁质,包括3,5,12,15,20,24,28,32,35,37,41,47,51,53,59各题。
            //var arr1 = [2, 6, 9, 14, 17, 21, 27, 31, 36, 38, 42, 48, 50, 54, 58];
            //var arr2 = [4, 8, 11, 16, 19, 23, 25, 29, 34, 40, 44, 46, 52, 56, 60];
            //var arr3 = [1, 7, 10, 13, 18, 22, 26, 30, 33, 39, 43, 45, 49, 55, 57];
            //var arr4 = [3, 5, 12, 15, 20, 24, 28, 32, 35, 37, 41, 47, 51, 53, 59];

            var arr1 = [2, 6, 9];
            var arr2 = [4, 8];
            var arr3 = [1, 7, 10];
            var arr4 = [3, 5];

            for (var i = 0; i < arr1.length; i++) {
                if (results[arr1[i]-1] == 1) {
                    score1 += 2;
                } else if (results[arr1[i]-1] == 2) {
                    score1 += 1;
                } else if (results[arr1[i]-1] == 3) {
                    score1+=0;
                } else if (results[arr1[i]-1] == 4) {
                    score1+=-1;
                } else if (results[arr1[i]-1] == 5) {
                    score1+=-2;
                }
            }
            for (var i = 0; i < arr2.length; i++) {
                if (results[arr2[i]-1] == 1) {
                    score2 += 2;
                } else if (results[arr2[i]-1] == 2) {
                    score2 += 1;
                } else if (results[arr2[i]-1] == 3) {
                    score2 += 0;
                } else if (results[arr2[i]-1] == 4) {
                    score2 += -1;
                } else if (results[arr2[i]-1] == 5) {
                    score2 += -2;
                }
            }
            for (var i = 0; i < arr3.length; i++) {
                if (results[arr3[i]-1] == 1) {
                    score3 += 2;
                } else if (results[arr3[i]-1] == 2) {
                    score3 += 1;
                } else if (results[arr3[i]-1] == 3) {
                    score3 += 0;
                } else if (results[arr3[i]-1] == 4) {
                    score3 += -1;
                } else if (results[arr3[i]-1] == 5) {
                    score3 += -2;
                }
            }

            for (var i = 0; i < arr4.length; i++) {
                if (results[arr4[i]-1] == 1) {
                    score4 += 2;
                } else if (results[arr4[i]-1] == 2) {
                    score4 += 1;
                } else if (results[arr4[i]-1] == 3) {
                    score4 += 0;
                } else if (results[arr4[i]-1] == 4) {
                    score4 += -1;
                } else if (results[arr4[i]-1] == 5) {
                    score4 += -2;
                }
            }
            var scores = [];
            var learPattern;
            scores.push(score1, score2, score3, score4);
            var scoreItems = scores.sort(function (a, b) { return b - a });
            if (scoreItems[0] == score2) {
                learPattern = "多血质";
            } else if (coreItems[0] == score1) {
                learPattern = "胆汁质";
            } else if (coreItems[0] == score3) {
                learPattern = "粘液质";
            } else if (coreItems[0] == score4) {
                learPattern = " 抑郁质";
            }
            
            $.ajax({
                type: "post",
                url: "handler/questionnaire.ashx",
                data: { s1: score1, s2: score2, s3: score3, s4: score4,pattern:learPattern },
                success: function (msg) {
                    //1 分数记录成功
                    if (msg == 1) {
                        resultSet = '<h2 class="qTitle">您已做完问卷,请耐心等待分组结果！</h2>' + resultSet + '<div class="jquizzy-clear"></div>';
                        superContainer.find('.result-keeper').html(resultSet).show(500);
                        superContainer.find('.resultsview-qhover').hide();
                        //alert(score1);
                        //alert(score2);
                        //alert(score3);
                        //alert(score4);
                        //alert(results);
                        //alert(results[1]);
                        //alert(results[0]);
                        //alert(learPattern);
                        $(this).parents('.slide-container').fadeOut(500,
                            function () {
                                $(this).next().fadeIn(500);
                            });
                        //跳转
                        //location.href = "index.aspx";
                    } else {
                        resultSet = '<h2 class="qTitle">发生了未知错误</h2>' + resultSet + '<div class="jquizzy-clear"></div>';
                    }
                },
                error: function () {
                    resultSet = '<h2 class="qTitle">服务器内部发生错误</h2>' + resultSet + '<div class="jquizzy-clear"></div>';
                }
            })
            
            return false;
            
        });
    };
})(jQuery);