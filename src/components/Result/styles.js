import styled from 'styled-components'

const ResultStyles = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  height: 100%;

  .result-container {
    height: 100%;
    box-sizing: border-box;

    .title {
      background-color: rgba(255, 255, 255, 0.45);
      padding: 30px;
      font-size: 1.25rem;
      font-weight: 400;
      color: #495057;
      background-color: #f7f9fa;
    }

    .body {
      background-color: #f1f4f6;
      height: 100%;
      padding: 30px;

      .parent-card {
        background-color: #fff;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
          0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
          0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
          0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
        border-radius: 0.25rem;
        border: 1px solid rgba(26, 54, 126, 0.125);
        padding: 1.25rem;
      }

      .percent-container {
        .percent-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          font-weight: 400;
          line-height: 1.2;
        }
        .percent-body {
          padding: 1.5rem;
          display: flex;
          justify-content: space-evenly;
          align-items: center;

          .percent-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .phase-name {
              font-size: 0.88rem;
              font-weight: bolder;
              line-height: 1.5;
              color: #495057;
              margin-bottom: 1rem;
            }
            .percent-circle {
              height: 120px;
              width: 120px;
              border-style: solid;
              border-width: 10px;
              border-radius: 50%;
              background-color: whitesmoke;
              font-size: 30px;
              font-weight: 400;
              color: #495057;
              line-height: 1.5;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.2s ease-in;
              box-sizing: border-box;

              &:hover {
                border-width: 4px;
                padding: 6px;
                font-size: 40px;
                color: #000;
              }
            }
          }
        }
      }
      .thank-you-box {
        border-radius: 0.25rem;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid #bee7ff;
        background-color: #d0eeff;
        color: #0b5885;

        .recommendation-text {
          color: #3f6ad8;
          font-weight: bolder;
          font-size: 0.88rem;
          cursor: pointer;

          &:hover{
              text-decoration: underline;
          }
        }

        .thank-you-title {
          font-weight: bolder;
          font-size: 0.88rem;
          line-height: 1.5;
        }
        .thank-you-subtitle {
          margin-bottom: 1rem;
          font-weight: 400;
          font-size: 0.88rem;
          line-height: 1.5;
        }
      }
      .overall-result {
        margin-bottom: 1rem;
        .overall-result-title {
          margin-bottom: 0.5rem;
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 1.2;
        }
        .overall-result-table {
          border-top: 1px solid #e9ecef;
        }
        .header-row {
          border-bottom: 2px solid #e9ecef !important;

          .column {
            font-weight: bold !important;
          }
        }
        .row {
          display: flex;
          border-bottom: 1px solid #e9ecef;
          border-left: 1px solid #e9ecef;

          .column {
            border-right: 1px solid #e9ecef;
            padding: 0.55rem;
            font-size: 0.88rem;
            font-weight: 400;
            color: #495057;
            line-height: 1.5;
          }

          .phase {
            width: 35%;
            font-weight: bold;
          }
          .score {
            width: 20%;
          }
          .maturity_level {
            width: 45%;
          }
        }
      }
      .detailed-result {
        margin-bottom: 1rem;
        .detailed-result-title {
          margin-bottom: 0.5rem;
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 1.2;
        }

        .category-card {
          box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
            0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
            0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
            0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
          transition: all 0.2s;
          border-radius: 0.25rem;
          background-color: #fff;
          border: 1px solid rgba(26, 54, 126, 0.125);

          .category-name {
            height: 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-transform: uppercase;
            padding-left: 32px;
            cursor: pointer;
            font-size: 0.8rem;
            color: #3f6ad8;
            font-weight: 400;
            border-bottom: 1px solid rgba(26, 54, 126, 0.125);
          }
          .invisible {
            height: 0 !important;
          }
          .category-table {
            padding: 1.25rem;
            margin-bottom: 1rem;
            height: max-content;
            transition: height 0.2s;

            .header-row {
              border-bottom: 1px solid #e9ecef !important;

              .column {
                font-weight: bold !important;
              }
            }
            .row {
              border-top: 1px solid #e9ecef;
              display: flex;
            }
            .column {
              padding: 0.55rem;
              font-size: 0.88rem;
              font-weight: 400;
              color: #495057;
              line-height: 1.5;
            }
            .category {
              width: 60%;
              font-weight: bold;
            }
            .score {
              width: 15%;
            }
            .maturity_level {
              width: 35%;
            }
          }
        }
      }
    }
  }
`

export default ResultStyles
