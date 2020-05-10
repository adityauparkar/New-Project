import styled from 'styled-components';

const LoginStyles = styled.div`

font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

.login-container{
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    width: 40%;
    margin: 3rem auto;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    background-color: #fff;
    padding: 1.25rem;
    box-sizing: border-box;

    .title{
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: .5rem;
        font-weight: 500;
        line-height: 1.2;
    }

    .fields-container{
       
    .field{
        margin-bottom: 1rem;

        &:last-child{
            margin-bottom: 3rem;
        }
    }
    }

    .label{
        color: #212529;
        font-size: 1rem;
        font-weight: 400;
        margin-bottom: .5rem;
    }

    .error-msg{
        font-size: 10px;
        color: #fd1616;
    }

    input{
        border: 1px solid #ced4da;
        background-color: #fff;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        color: #495057;
        font-size: 1rem;
        font-weight: 400;
        padding: .375rem .75rem;
        width: 100%;
        line-height: 1.5;
        border-radius: .25rem;
        box-sizing: border-box;

        &:focus{
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
            border-color: #80bdff;
            outline: 0;
        }
    }

    .already-exists{
        padding: 15px;
        font-size: 14px;
        border: 1px solid #fd1616;
        color: #fd1616;
        background-color: #f9d8d8;
        width: max-content;
        margin: 0 auto 10px auto;
    }

    .error{
        
        .label{
            color: #fd1616 !important;
        }

        input{
            color: #495057 !important;
            border-color: #fd1616 !important;

            &:focus{
                border-color: #fd1616 !important;
                box-shadow: 0 0 0 0.2rem #f9d8d8 !important; 
            }
        }
    }

    .create-account-button{
        cursor: pointer;
        color: #fff;
        padding: .5rem 1rem;
        font-size: 1.25rem;
        border-radius: .3rem;
        background-color: #007bff;
        border-color: #007bff;
        line-height: 1.5;
        margin-bottom: 1rem;
        text-align: center;

        &:hover{
            background-color: #0069d9;
            border-color: #0062cc;
        }
        &:focus{
            box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
        }
    }

    .already-account{
        margin-bottom: 1rem;

        a{
            color: #007bff !important;
            text-decoration: none !important;

            &:hover{
                text-decoration: underline !important;
            }
        }
    }
    
}

`;

export default LoginStyles