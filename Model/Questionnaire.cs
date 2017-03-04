using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    public class Questionnaire
    {
        public Questionnaire()
		{}
		#region Model
		private int _stunum;
		private string _score1;
		private string _score2;
        private string _score3;
        private string _score4;
		/// <summary>
		/// 
		/// </summary>
		public int Stunum
		{
			set{ _stunum=value;}
			get{return _stunum;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Score1
		{
			set{ _score1=value;}
			get{return _score1;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Score2
		{
			set{ _score2=value;}
			get{return _score2;}
		}
        public string Score3
        {
            set { _score3 = value; }
            get { return _score3; }
        }
        public string Score4
        {
            set { _score4 = value; }
            get { return _score4; }
        }
		#endregion Model
    }
}
