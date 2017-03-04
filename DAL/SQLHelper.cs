using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace DAL
{
    class SQLHelper
    {
        public SQLHelper()
        {

        }
        private static string connStr =  ConfigurationManager.ConnectionStrings["conn"].ConnectionString;

        public static DataTable ExecuteTableSql(string sql, params SqlParameter[] param)
        {
            return ExecuteTable(sql, CommandType.Text, param);
        }

        public static DataTable ExecuteTableSP(string sp, params SqlParameter[] parm)
        {
            return ExecuteTable(sp, CommandType.StoredProcedure, parm);
        }

        /// <summary>
        /// 执行查询
        /// </summary>
        /// <param name="txt"></param>
        /// <param name="ct">sql语句，还是存储过程</param>
        /// <param name="param"></param>
        /// <returns></returns>
        private static DataTable ExecuteTable(string txt, CommandType ct, params SqlParameter[] param)
        {

            using (SqlConnection conn = new SqlConnection(connStr))
            {
                using (SqlCommand cmd = new SqlCommand(txt, conn))
                {
                    cmd.CommandType = ct;
                    cmd.Parameters.AddRange(param);
                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        sda.Fill(dt);
                        return dt;
                    }
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="txt"></param>
        /// <param name="ct"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string txt, CommandType ct, params SqlParameter[] param)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                using (SqlCommand cmd = new SqlCommand(txt, conn))
                {
                    cmd.CommandType = ct;
                    cmd.Parameters.AddRange(param);

                    conn.Open();
                    return cmd.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="txt"></param>
        /// <param name="ct"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static object ExecuteScalar(string txt, CommandType ct, params SqlParameter[] param)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                using (SqlCommand cmd = new SqlCommand(txt, conn))
                {
                    cmd.CommandType = ct;
                    cmd.Parameters.AddRange(param);

                    conn.Open();
                    return cmd.ExecuteScalar();
                }
            }
        }
    }
}
