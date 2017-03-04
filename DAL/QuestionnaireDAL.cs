using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class QuestionnaireDAL
    {
        public bool ScoreInsert(string stunum,int score1,int score2,int score3,int score4,string pattern)
        {
            string sql = "update personalityTest set isTest=1,danZhi=@score1,duoXue=@score2,nianYe=@score3,yiYu=@score4,pattern=@pattern where StuNo=@stunum";
            SqlParameter[] paras = new SqlParameter[] { new SqlParameter("@stunum", stunum), new SqlParameter("@score1", score1), new SqlParameter("@score2", score2), new SqlParameter("@score3", score3), new SqlParameter("@score4", score4),new SqlParameter("@pattern",pattern) };
            int item = SQLHelper.ExecuteNonQuery(sql,CommandType.Text, paras);

            if (item > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}
