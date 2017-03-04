using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model;
using BLL;


namespace Webapp.handler
{
    /// <summary>
    /// questionnaire 的摘要说明
    /// </summary>
    public class questionnaire : IHttpHandler
    {
        /// <summary>
        /// 胆汁质，包括2，6，9，14，17，21，27，31，36，38，42，48，50，54，58各题；
        /// 多血质，包括4，8，11，16，19，23，25，29，34，40，44，46，52，56，60各题；
        /// 粘液质，包括1，7，10，13，18，22，26，30，33，39，43，45，49，55，57各题；
        /// 抑郁质，包括3，5，12，15，20，24，28，32，35，37，41，47，51，53，59各题。
        /// 1、testScore1 胆汁质总分
        /// 2、testScore2 多血质总分
        /// 3、testScore3 粘液质总分
        /// 4、testScore4 抑郁质总分
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string stunum="1610030169";
            int testScore1 = int.Parse(context.Request.Form["s1"]);
            int testScore2 = int.Parse(context.Request.Form["s2"]);
            int testScore3 = int.Parse(context.Request.Form["s3"]);
            int testScore4 = int.Parse(context.Request.Form["s4"]);
            string learPattern=context.Request.Form["pattern"];
            int msg;
            QuestionnaireBLL bll = new QuestionnaireBLL();
            bll.ScoreInsert(stunum, testScore1, testScore2, testScore3, testScore4,learPattern, out msg);            
            context.Response.Write(msg);
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}