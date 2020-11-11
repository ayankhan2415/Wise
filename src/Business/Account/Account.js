import React, { Component } from 'react';
import './Account.scss'
import DummyAccount from '../../DummyAccount'
import BizUser from '../BizUser';
import { isAuthenticate, getAllBizAccounts, logOut } from '../../Services/Services';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


class Account extends Component {
    constructor() {
        super()
        this.state = {
            // data: DummyAccount,
            isLoading: true,
            // biz_user: null
            // toggleSortOrder: false
        }
    }

    componentDidMount() {
        getAllBizAccounts().then((res) => {
            this.setState({
                isLoading: false,
                data: res.data,
                orignalData: res.data
            })
            // console.log("accountttttt data", res)
            if (res.message == "Unauthenticated.") {
                logOut();
            }
            else {
                this.setState({ data: res.data })
                this.setState({ orignalData: res.data })
            }
        })

    }
    sortTable = (type) => {
        switch (type) {
            case 'AZ':
                this.sortByAZ();
                break;
            case 'ID':
                this.sortByID();
                break;
            case 'MOST_RECENT':
                this.sortByMostRecent();
                break;
            case 'Free_plan':
                this.sortByPlan("Free Plan");
                break;
            case 'Essential_plan':
                this.sortByPlan("Essential Plan");
                break;
            case 'Standrd_plan':
                this.sortByPlan("Standard Plan");
                break;
            case 'Premium_plan':
                this.sortByPlan("Premium Plan");
                break;
        }
    }

    sortByAZ() {
        let sortedData = this.state.orignalData;
        sortedData.sort((a, b) => {
            if (a.brand_name < b.brand_name) {
                return -1;
            }
            if (a.brand_name > b.brand_name) {
                return 1;
            }
            return 0
        })
        this.setState(prevState => {
            return {
                data: sortedData,
                toggleSortOrder: !prevState.toggleSortOrder
            }
        });
    }
    sortByID() {
        let sortedData = this.state.orignalData;
        sortedData.sort((a, b) => {
            if (a.id > b.id) {
                return -1;
            }
            if (a.id < b.id) {
                return 1;
            }
            return 0
        })
        this.setState(prevState => {
            return {
                data: sortedData,
                toggleSortOrder: !prevState.toggleSortOrder
            }
        });
    }
    sortByPlan(plan) {
        let sortedData = this.state.orignalData;
        let data = [];
        sortedData.map((a) => {
            if (a.plan == plan) {
                data.push(a)
            }
        });

        console.log("free paln data ", data);
        this.setState(prevState => {
            return {
                data: data,
                toggleSortOrder: !prevState.toggleSortOrder
            }
        });
    }


    render() {
        // const {data,isLoading} = this.state
        // console.log("hehehehelooow", data)

        const { isLoading, data, orignalData } = this.state
        console.log("orignalData", orignalData)

        return (
            isLoading ? (<Loader className="text-center loader"
                type="Oval"
                color="#323A40"
                height={200}
                width={200}
            />) : (
                    <div className="acc-scroll">
                        <div className="row pl-4" style={{ width: "97%" }}>
                            <div className="col-12 main-div">
                                {/* <div className=""> */}
                                <div className="account-main-div">
                                    <div className="account-header-text">
                                        <h4>Accounts</h4>
                                        <span onClick={() => this.sortTable('Premium_plan')} style={{ backgroundColor: "#1D68ED" }} className="account-label-background sort-label-mrg"></span>
                                        <span onClick={() => this.sortTable('Standard Plan')} style={{ backgroundColor: "#0AE2E2" }} className="account-label-background"></span>
                                        <span onClick={() => this.sortTable('Essential_plan')} style={{ backgroundColor: "#E2E20A" }} className="account-label-background"></span>
                                        <span onClick={() => this.sortTable('Free_plan')} style={{ backgroundColor: "#FFCA9F" }} className="account-label-background"></span>
                                        <span className="pr-4" onClick={() => this.sortTable('AZ')}>A-Z</span>
                                        <span onClick={() => this.sortTable('ID')} >Most recent</span>
                                    </div>
                                    <div className=" mrg-0 pad-0">
                                        <table className="table table-borderless acc-table" >
                                            <tbody>
                                                {
                                                    data.map((row, i) => (

                                                        <tr className="table-color1" key={i} >
                                                            <td style={{ width: "17%" }} className="radius-left tbl-pad"><Link style={{ textDecoration: "none", color: "white" }} to={{ pathname: `account/bizuser/${row.id}`, state: { row } }}> {row.brand_name} </Link></td>
                                                            <td className="tbl-pad">{row.address}</td>
                                                            <td className="tbl-pad" style={{ width: "10%" }}>{row.incharge_name}</td>
                                                            <td className="tbl-pad pl-5" style={{ width: "12%" }}>{row.card_type}</td>
                                                            <td className="tbl-pad pl-0" style={{ width: "12%" }}> <span className="pl-0"> . . . . </span> {row.card_number}</td>
                                                            <td className="tbl-pad radius-right pt-3" style={{ width: "15%", fontWeight: "bold" }}> <span className="span-color">{row.plan}</span></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                            {/* <div className="col-1"></div> */}
                        </div>
                    </div>
                )
        )
    }
}


export default Account;