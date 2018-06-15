using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

/// <summary>
/// Summary description for WebsystemStrings
/// </summary>
/// 
namespace WebSystem
{
    public class Strings
    {
        public Strings()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public static string StripHtml(string Txt)
        {
            //strips all tags from string
            return Regex.Replace(Txt, "<(.|\\n)*?>", string.Empty);
        }

        public static String StripTags(String input, params String[] allowedTags)
        {
            //strips all but allowed tags from string
            if (String.IsNullOrEmpty(input)) return input;
            MatchEvaluator evaluator = m => String.Empty;
            if (allowedTags != null && allowedTags.Length > 0)
            {
                Regex reAllowed = new Regex(String.Format(@"^<(?:{0})\b|\/(?:{0})>$", String.Join("|", allowedTags.Select(x => Regex.Escape(x)).ToArray())));
                evaluator = m => reAllowed.IsMatch(m.Value) ? m.Value : String.Empty;
            }
            return Regex.Replace(input, @"<[^>]+?\/?>", evaluator);
        }

        public static string StripHtmlLAnchor(string inputString)
        {
            //strips all tags from string but <a>
            Regex r = new Regex(@"(?!</a>)(<\w+>|</\w+>)");
            var removedTags = r.Replace(inputString, "");


            return removedTags;
        }



        //split stringu, multiple delimiter
        public static string[] splitStringByPhrase(string text, string phrase)
        {
            string pattern = phrase.ToLower();
            string[] list = text.ToLower().Split(new string[] { pattern }, StringSplitOptions.None);
            return list;
        }

        //split stringu, jeden delimiter
        public static string splitString(string _source, string _delimiter, int _poradi)
        {
            char delimiter = Convert.ToChar(_delimiter);
            string[] source = _source.Split(delimiter);
            string result = "";

            int strcount = 0;
            foreach (string word in source)
            {
                if (strcount == _poradi)
                {
                    result = word;
                }
                strcount = strcount + 1;
            }

            return result;
        }


        public static int[] AllIndexesOf(string str, string substr, bool ignoreCase = false)
        {
            if (string.IsNullOrWhiteSpace(str) ||
                string.IsNullOrWhiteSpace(substr))
            {
                throw new ArgumentException("String or substring is not specified.");
            }

            var indexes = new List<int>();
            int index = 0;

            while ((index = str.IndexOf(substr, index, ignoreCase ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal)) != -1)
            {
                indexes.Add(index++);
            }

            return indexes.ToArray();
        }

        public static string TagWordInString(string text, string word, string startTag = " <span class='txtSelection'>", string endTag = "</span>")
        {
            //funkce oznacuje tagy substring ve stringu
            //string pattern = @"[ ]?" + word;
            string pattern = @"[ ]?" + word + "[ ]?";
            string replacement = startTag + word + endTag;
            return Regex.Replace(text, word, replacement, RegexOptions.IgnoreCase);
        }

        public static string TagSubstringInString(string text, string word, string startTag = " <span class='txtSelection'>", string endTag = "</span>")
        {
            //string pattern = @"[ ]?" + word;// word;
            string pattern = @"[ ]?" + word + "[ ]?";// word;

            string replacement = startTag + word + endTag;
            Regex rgx = new Regex(pattern);
            string result = rgx.Replace(text, replacement);
            return result;
        }


        //generuje náhodný alphanumerický string
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        public static string Right(string str, int length)
        {
            if (!String.IsNullOrEmpty(str))
            {
                if (str.Length < length)
                {
                    return "";
                }
                else
                {
                    return str.Substring(str.Length - length, length);
                }
            }
            else
            {
                return "";
            }

        }


        public static string Left(string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            maxLength = Math.Abs(maxLength);

            return (value.Length <= maxLength
                   ? value
                   : value.Substring(0, maxLength)
                   );
        }

        //validaceEmailu
        public static bool correctEmail(string emailaddress)
        {
            bool success = false;
            bool val1 = false;
            bool val2 = false;
            bool val3 = false;
            //obsahuje zavináč
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                val1 = true;
            }
            catch (FormatException)
            {
                val1 = false;
            }
            //obsahuje tečku
            if (emailaddress.Contains('.'))
            {
                val2 = true;
            }
            else
            {
                val2 = false;
            }
            //obsahuje part za tečkou
            string domena = null;
            try
            {
                domena = splitString(emailaddress, ".", 1);
            }
            catch { }
            if (domena != "")
            {
                val3 = true;
            }
            else
            {
                val3 = false;
            }
            //shrnutí podmínek
            if ((val1) && (val2) && (val3))
            {
                success = true;
            }

            return success;
        }
    }
}

