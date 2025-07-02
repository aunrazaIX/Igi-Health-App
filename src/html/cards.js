import logo from '../assets/icons/logo.png';
export const testReturn = () => {
  return `<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>
            <div style="padding: 20px">
              <table
                style="
                  width: 396px;
                  border-radius: 24px;
                  box-shadow: 0px 2px 12.1px 0px rgba(0, 0, 0, 0.25);
                  padding: 20px;
                  background-color: #ffffff;
                  margin: 0 auto;
                  font-size: 16px;
                  color: #393939;
                  min-height: 237px;
                ">
                <tbody>
                  <tr>
                    <td style="padding-bottom: 15px">
                      <img
                      src="${logo}"
                        alt=""
                        style="width: 107px; height: 48px" />
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>Policy Number: </span>
                      <span>12345</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Class: </span>
                      <span>0001</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>CNIC: </span>
                      <span>12345-6789012-3</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Cert No: </span>
                      <span>18</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>Policy Name: </span>
                      <span>Son</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Age: </span>
                      <span>18</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px; padding-top: 15px">
                      Card Holder Name
                    </td>
                  </tr>

                  <tr>
                    <td style="font-size: 17px; font-weight: 600">
                      Dummy Employee
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style="
                  width: 396px;
                  border-radius: 24px;
                  box-shadow: 0px 2px 12.1px 0px rgba(0, 0, 0, 0.25);
                  padding: 20px;
                  background-color: #ffffff;
                  margin: 20px auto 0 auto;
                  font-size: 16px;
                  color: #393939;
                  min-height: 237px;
                ">
                <tbody>
                  <tr style="font-size: 20px">
                    <td style="padding-bottom: 5px; font-weight: 700">
                      Dependent <span style="color: #ee2560">Details</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>Son:</td>
                            <td>18</td>
                          </tr>

                          <tr>
                            <td>Daughter:</td>
                            <td>24</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table style="font-weight: 600">
                        <tr>
                          <td style="padding-bottom: 15px">Valid from:</td>
                          <td style="padding-bottom: 15px">01-01-1970</td>
                        </tr>

                        <tr>
                          <td>Valid from:</td>
                          <td>02-07-2025</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src="max-room.png"
                                alt=""
                                style="width: 30px; height: 30px" />
                            </td>
                            <td style="font-size: 14px; padding-left: 5px">
                              <p style="margin: 0px">Max. Room & Board</p>
                              <p style="margin: 0px">
                                Rs. Per Day:<span> 0</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src="maternity.png"
                                alt=""
                                style="width: 21px; height: 34px" />
                            </td>
                            <td style="font-size: 14px; padding-left: 5px">
                              <p style="margin: 0px">Maternity</p>
                              <p style="margin: 0px">Not Available</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
};
