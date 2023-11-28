const ELEMENT_1250_OPTIONS = [
  {
    value: "CC",
    label: "First Two Digits of Year Expressed in Format CCYY",
    paragraph_number: "1",
    notes: [
      {
        content: "The first two characters in the year CCYY",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CD",
    label: "Month and Year Expressed in Format MMMYYYY",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Date expressed as Month, Month, Month, all upper case alpha and Year, Year, \nYear, Year e.g., JAN 1994, FEB 1994, etc",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CM",
    label: "Date in Format CCYYMM",
    paragraph_number: "1",
  },
  {
    value: "CQ",
    label: "Date in Format CCYYQ",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Date expressed as Year, Year, Year, Year, e.g., 1996, and Q as quarter within \nthat year",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "CY",
    label: "Year Expressed in Format CCYY",
    paragraph_number: "1",
  },
  {
    value: "D6",
    label: "Date Expressed in Format YYMMDD",
    paragraph_number: "1",
  },
  {
    value: "D8",
    label: "Date Expressed in Format CCYYMMDD",
    paragraph_number: "1",
  },
  {
    value: "DA",
    label: "Range of Dates within a Single Month Expressed in Format DD-DD",
    paragraph_number: "1",
  },
  {
    value: "DB",
    label: "Date Expressed in Format MMDDCCYY",
    paragraph_number: "1",
  },
  {
    value: "DD",
    label: "Day of Month in Numeric Format",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The numeric day of the month expressed using a lead zero if the number of the \nday is less than ten",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DT",
    label: "Date and Time Expressed in Format CCYYMMDDHHMM",
    paragraph_number: "1",
  },
  {
    value: "EH",
    label: "Last Digit of Year and Julian Date Expressed in Format YDDD",
    paragraph_number: "1",
  },
  {
    value: "KA",
    label: "Date Expressed in Format YYMMMDD",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Date expressed as Year, Year, Month, Month, Month, Day, Day, e.g., 94JAN01",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "MD",
    label: "Month of Year and Day of Month Expressed in Format MMDD",
    paragraph_number: "1",
  },
  {
    value: "MM",
    label: "Month of Year in Numeric Format",
    paragraph_number: "1",
    notes: [
      {
        content:
          "The month of the year consecutively numbered from one for January to twelve for \nDecember and expressed using a lead zero if the number of the month is less \nthan ten",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RD",
    label: "Range of Dates Expressed in Format MMDDCCYY-MMDDCCYY",
    paragraph_number: "1",
  },
  {
    value: "TC",
    label: "Julian Date Expressed in Format DDD",
    paragraph_number: "1",
  },
  {
    value: "TM",
    label: "Time Expressed in Format HHMM",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Time expressed in the format HHMM where HH is the numerical expression of hours \nin the day based on a twenty-four hour clock and MM is the numerical expression \nof minutes within an hour",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TQ",
    label: "Date Expressed in Format MMYY",
    paragraph_number: "1",
  },
  {
    value: "TR",
    label: "Date and Time Expressed in Format DDMMYYHHMM",
    paragraph_number: "1",
  },
  {
    value: "TS",
    label: "Time Expressed in Format HHMMSS",
    paragraph_number: "1",
    notes: [
      {
        content:
          "Time expressed in the format HHMMSS where HH is the numerical expression of \nhours in the day based on a twenty-four hour clock, MM is the numerical \nexpression of minutes within an hour, and SS is the numerical expression of \nseconds within a minute",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "TT",
    label: "Date Expressed in Format MMDDYY",
    paragraph_number: "1",
  },
  {
    value: "TU",
    label: "Date Expressed in Format YYDDD",
    paragraph_number: "1",
  },
  {
    value: "UN",
    label: "Unstructured",
    paragraph_number: "1",
  },
  {
    value: "YM",
    label: "Year and Month Expressed in Format YYMM",
    paragraph_number: "1",
  },
  {
    value: "YY",
    label: "Last Two Digits of Year Expressed in Format CCYY",
    paragraph_number: "1",
    notes: [
      {
        content: "The year in the century (00 to 99)",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "DTS",
    label:
      "Range of Date and Time Expressed in Format CCYYMMDDHHMMSS-CCYYMMDDHHMMSS",
    paragraph_number: "1",
  },
  {
    value: "RD2",
    label: "Range of Years Expressed in Format YY-YY",
    paragraph_number: "1",
  },
  {
    value: "RD4",
    label: "Range of Years Expressed in Format CCYY-CCYY",
    paragraph_number: "1",
  },
  {
    value: "RD5",
    label: "Range of Years and Months Expressed in Format CCYYMM-CCYYMM",
    paragraph_number: "1",
  },
  {
    value: "RD6",
    label: "Range of Dates Expressed in Format YYMMDD-YYMMDD",
    paragraph_number: "1",
  },
  {
    value: "RD8",
    label: "Range of Dates Expressed in Format CCYYMMDD-CCYYMMDD",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A range of dates expressed in the format CCYYMMDD-CCYYMMDD where CCYY is the \nnumerical expression of the century CC and year YY, MM is the numerical \nexpression of the month within the year, and DD is the numerical expression of \nthe day within the year; the first occurrence of CCYYMMDD is the beginning date \nand the second occurrence is the ending date",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RDM",
    label: "Range of Dates Expressed in Format YYMMDD-MMDD",
    paragraph_number: "1",
  },
  {
    value: "RDT",
    label:
      "Range of Date and Time, Expressed in Format CCYYMMDDHHMM-CCYYMMDDHHMM",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A range of dates and times expressed in the format CCYYMMDDHHMM-CCYYMMDDHHMM \nwhere CCYY is the numerical expression of the century CC and year YY, MM is the \nnumerical expression of the month within the year, DD is the numerical \nexpression of the day within the month, HH is the numerical expression of hours \nin the day based on a twenty-four hour clock, and MM is the numerical \nexpression of minutes within an hour; the first occurrence of CCYYMMDDHHMM is \nthe starting time and the second is the ending time",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RMD",
    label: "Range of Months and Days Expressed in Format MMDD-MMDD",
    paragraph_number: "1",
  },
  {
    value: "RMY",
    label: "Range of Years and Months Expressed in Format YYMM-YYMM",
    paragraph_number: "1",
  },
  {
    value: "RTM",
    label: "Range of Time Expressed in Format HHMM-HHMM",
    paragraph_number: "1",
    notes: [
      {
        content:
          "A range of times expressed in the form HHMM-HHMM where HH is the numerical \nexpression of hours in the day based on a twenty-four hour clock and MM is the \nnumerical expression of minutes within an hour; the first occurrence of HHMM is \nthe starting time and the second is the ending time",
        paragraph_number: "1",
      },
    ],
  },
  {
    value: "RTS",
    label: "Date and Time Expressed in Format CCYYMMDDHHMMSS",
    paragraph_number: "1",
  },
  {
    value: "YMM",
    label: "Range of Year and Months, Expressed in CCYYMMM-MMM Format",
    paragraph_number: "1",
  },
];

export { ELEMENT_1250_OPTIONS };
