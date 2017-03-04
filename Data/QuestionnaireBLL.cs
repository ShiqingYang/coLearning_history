using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using DAL;

namespace BLL
{
    public class QuestionnaireBLL
    {
        private QuestionnaireDAL dal=new QuestionnaireDAL();
        public bool ScoreInsert(string stunum, int score1,int score2,int score3,int score4,string pattern, out int msg)
        {
            bool r;
            r=dal.ScoreInsert(stunum,score1,score2,score3,score4,pattern);
            if (r == true)
            {
                msg = 1;
            }else{
                msg=0;
            }
            
            return r;
        }
    }
}
