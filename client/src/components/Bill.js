import React from 'react';
import styled from 'styled-components';

const Bill = ({
  ratePerMinute,
  timeSpend,
  totalRate,
  totalCommission,
  totalAmount,
  programmingLanguage,
  startingDate,
  endingDate,
  teacher,
  student,
}) => {
  function currencyConvert(value) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(value);
  }

  function time_convert(num) {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return `${
      num < 60
        ? minutes + 'min'
        : num % 60 === 0
        ? hours + ' hour'
        : hours + ' hr' + ' : ' + minutes + 'min'
    }`;
  }
  return (
    <>
      <BillWrapper>
        {/* start preheader */}
        <div
          className="preheader"
          style={{
            display: 'none',
            maxWidth: 0,
            maxHeight: 0,
            overflow: 'hidden',
            fontSize: '1px',
            lineHeight: '1px',
            color: '#fff',
            opacity: 0,
          }}
        >
          A preheader is the short summary text that follows the subject line
          when an email is viewed in the inbox.
        </div>
        {/* end preheader */}
        {/* start body */}
        <table border={0} cellPadding={0} cellSpacing={0} width="100%">
          {/* start logo */}
          <tbody>
            <tr>
              <td align="center" bgcolor="#6EBB4E">
                {/*[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]*/}
                <table
                  border={0}
                  cellpaddding={0}
                  cellSpacing={0}
                  width="100%"
                  style={{ maxWidth: '600px' }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        valign="top"
                        style={{ padding: '36px 24px' }}
                      >
                        <a
                          href="https://sendgrid.com"
                          target="_blank"
                          style={{ display: 'inline-block' }}
                        >
                          <img
                            src="/img/logo.png"
                            alt="Logo"
                            border={0}
                            width={48}
                            style={{
                              display: 'block',
                              width: '48px',
                              maxWidth: '48px',
                              minWidth: '48px',
                            }}
                          />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/*[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]*/}
              </td>
            </tr>
            {/* end logo */}
            {/* start hero */}
            <tr>
              <td align="center" bgcolor="#6EBB4E">
                {/*[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]*/}
                <table
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  width="100%"
                  style={{ maxWidth: '600px' }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        bgcolor="#ffffff"
                        style={{
                          padding: '36px 24px 0',
                          fontFamily:
                            '"Source Sans Pro", Helvetica, Arial, sans-serif',
                          borderTop: '3px solid #d4dadf',
                        }}
                      >
                        <h1
                          style={{
                            margin: 0,
                            fontSize: '32px',
                            fontWeight: 700,
                            letterSpacing: '-1px',
                            lineHeight: '48px',
                          }}
                        >
                          Bill Summary
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/*[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]*/}
              </td>
            </tr>
            {/* end hero */}
            {/* start copy block */}
            <tr>
              <td align="center" bgcolor="#6EBB4E">
                {/*[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]*/}
                <table
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  width="100%"
                  style={{ maxWidth: '600px' }}
                >
                  {/* start copy */}
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        bgcolor="#ffffff"
                        style={{
                          padding: '24px',
                          fontFamily:
                            '"Source Sans Pro", Helvetica, Arial, sans-serif',
                          fontSize: '16px',
                          lineHeight: '24px',
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          Here is the summary of your bill. Your session will
                          start on
                          <b>{new Date(startingDate).toLocaleString()}</b> and
                          ends on <b>{new Date(endingDate).toLocaleString()}</b>
                          .<br />
                          <br />
                          We will send you a Session Link into your email once
                          you pay this bill or you can check it out in your
                          booking calendar by clicking your schedule.
                        </p>
                      </td>
                    </tr>
                    {/* end copy */}
                    {/* start receipt table */}
                    <tr>
                      <td
                        align="left"
                        bgcolor="#ffffff"
                        style={{
                          padding: '24px',
                          fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
                          fontSize: '16px',
                          lineHeight: '24px',
                        }}
                      >
                        <table
                          border={0}
                          cellPadding={0}
                          cellSpacing={0}
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                align="left"
                                bgcolor="#6EBB4E"
                                width="75%"
                                style={{
                                  padding: '12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                <strong>Programming Language</strong>
                              </td>
                              <td
                                align="left"
                                bgcolor="#6EBB4E"
                                width="25%"
                                style={{
                                  padding: '12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                <strong>{programmingLanguage}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                width="75%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                Language Rate per Minute
                              </td>
                              <td
                                align="left"
                                width="25%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                {currencyConvert(ratePerMinute)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                width="75%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                Duration
                              </td>
                              <td
                                align="left"
                                width="25%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                {time_convert(timeSpend)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                width="75%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                Total Commission
                              </td>
                              <td
                                align="left"
                                width="25%"
                                style={{
                                  padding: '6px 12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                }}
                              >
                                {currencyConvert(totalCommission)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                width="75%"
                                style={{
                                  padding: '12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                  borderTop: '2px dashed #6EBB4E',
                                  borderBottom: '2px dashed #6EBB4E',
                                }}
                              >
                                <strong>Amount to pay</strong>
                              </td>
                              <td
                                align="left"
                                width="25%"
                                style={{
                                  padding: '12px',
                                  fontFamily:
                                    '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                  borderTop: '2px dashed #6EBB4E',
                                  borderBottom: '2px dashed #6EBB4E',
                                }}
                              >
                                <strong>{currencyConvert(totalAmount)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    {/* end reeipt table */}
                  </tbody>
                </table>
                {/*[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]*/}
              </td>
            </tr>
            {/* end copy block */}
            {/* start receipt address block */}
            <tr>
              <td align="center" bgcolor="#6EBB4E" valign="top" width="100%">
                {/*[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]*/}
                <table
                  align="center"
                  bgcolor="#ffffff"
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  width="100%"
                  style={{ maxWidth: '600px' }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        valign="top"
                        style={{
                          fontSize: 0,
                          borderBottom: '3px solid #d4dadf',
                        }}
                      >
                        {/*[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="left" valign="top" width="300">
        <![endif]*/}
                        <div
                          style={{
                            display: 'inline-block',
                            width: '100%',
                            maxWidth: '50%',
                            minWidth: '240px',
                            verticalAlign: 'top',
                          }}
                        >
                          <table
                            align="left"
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            style={{ maxWidth: '300px' }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="left"
                                  valign="top"
                                  style={{
                                    paddingBottom: '36px',
                                    paddingLeft: '36px',
                                    fontFamily:
                                      '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                  }}
                                >
                                  <p>
                                    <strong>{student}</strong>
                                  </p>
                                  <p>Student</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/*[if (gte mso 9)|(IE)]>
        </td>
        <td align="left" valign="top" width="300">
        <![endif]*/}
                        <div
                          style={{
                            display: 'inline-block',
                            width: '100%',
                            maxWidth: '50%',
                            minWidth: '240px',
                            verticalAlign: 'top',
                          }}
                        >
                          <table
                            align="left"
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            style={{ maxWidth: '300px' }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="left"
                                  valign="top"
                                  style={{
                                    paddingBottom: '36px',
                                    paddingLeft: '36px',
                                    fontFamily:
                                      '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                  }}
                                >
                                  <p>
                                    <strong>{teacher}</strong>
                                  </p>
                                  <p>Teacher</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/*[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]*/}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/*[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]*/}
              </td>
            </tr>
            {/* end receipt address block */}
            {/* start footer */}
            <tr>
              <td align="center" bgcolor="#6EBB4E" style={{ padding: '24px' }}>
                {/*[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]*/}
                <table
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  width="100%"
                  style={{ maxWidth: '600px' }}
                >
                  {/* start permission */}
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        bgcolor="#6EBB4E"
                        style={{
                          padding: '12px 24px',
                          fontFamily:
                            '"Source Sans Pro", Helvetica, Arial, sans-serif',
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#fff',
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          By clicking the 'Pay' button you understand that your
                          balance will be deducted from the total amount of this
                          bill. This action cannot be undo or cancel once you
                          perform this action. We also do not offer refund
                          policy
                        </p>
                      </td>
                    </tr>
                    {/* end permission */}
                    {/* start unsubscribe */}
                    <tr>
                      <td
                        align="center"
                        bgcolor="#6EBB4E"
                        style={{
                          padding: '12px 24px',
                          fontFamily:
                            '"Source Sans Pro", Helvetica, Arial, sans-serif',
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#fff',
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          If you have any concern about this billing please
                          contact{' '}
                          <a href="https://sendgrid.com" target="_blank">
                            Jerald Sayson
                          </a>
                        </p>
                      </td>
                    </tr>
                    {/* end unsubscribe */}
                  </tbody>
                </table>
                {/*[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]*/}
              </td>
            </tr>
            {/* end footer */}
          </tbody>
        </table>
      </BillWrapper>
    </>
  );
};

const BillWrapper = styled.div`
  color: #222;

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }

  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }

  table {
    border-collapse: collapse !important;
  }

  a {
    color: #1a82e2;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
`;

export default Bill;
