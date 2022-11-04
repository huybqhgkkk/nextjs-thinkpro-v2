import React, {useEffect, useRef, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {MapMoneyToNumber} from '../../constants/function'
import { Button, Tooltip,Input ,DatePicker,Select,Typography,Row,Col,Radio,Form, Popover,message, Table, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { formatNumber } from '../../constants/function';
import {
  action_deleteTransaction,
  action_getListBank,
  action_getListTransaction,
  action_showModalCreateDoc,
  action_searchObjectByType
} from '../../redux/actions/request-payment'
import moment from "moment";
import _ from 'lodash';
import { useRouter } from 'next/router'
import NavBar1 from "../NavBar/nav-bar-1";
import ToolTable from 'src/components/toolTable';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD HH:MM';
const dateFormatFormData = 'HH:MM DD-MM-YYYY'
const { RangePicker } = DatePicker;
const { Paragraph,Text } = Typography;


const RequestPaymentComponent = (props) => {
  const {data,pagination,summarys} = useSelector(state => state.requestpayment.dataListTransaction);
  const {dataListBank} = useSelector(state => state.requestpayment);
  const dispatch = useDispatch();
  const [bank_account,setBank_account] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listObjectSend, setListObjectSend] = useState([]);
  const [listObjectReceive, setListObjectReceive] = useState([]);
  const [typeObjectSend, setTypeObecjtSend] = useState(0);
  const [typeObjectReceive, setTypeObecjtReceive] = useState(0);
  const [arrRowSelect, setArrRowSelect] = useState([]);
  const formData = useRef({
    per_page: 10,
    page: 1,
    start_date: null,
    end_date: null,
    code: null,
    kind: null,
    license: null,
    // bank_account_id: null,
  bank_account: null,
  })
  const kind_label = [
    {text: 'Chuyển quỹ về', value :1},
    {text: 'COD', value: 2},
    {text: 'Trả góp', value: 3},
    {text: 'Quẹt thẻ', value: 4},
    {text: 'Chuyển khoản', value: 5},
    {text: 'Chi cọc hoàn', value: 6},
    {text: 'Chi trả công nợ', value: 7},
    {text: 'Chi trả tiền hóa đơn', value: 8}
  ];
  // const kind_label = {
  //   '1': {text: 'Chuyển quỹ về'},
  //   '2': {text: 'COD'},
  //   '3': {text: 'Trả góp'},
  //   '4': {text: 'Quẹt thẻ'},
  //   '5': {text: 'Chuyển khoản'},
  //   '6': {text: 'Chi cọc hoàn'},
  //   '7': {text: 'Chi trả công nợ'},
  //   '8': {text: 'Chi trả tiền hóa đơn'}
  // }
  const [check,setCheck] = useState(true);
  const actionRef = useRef();
  const listRowSelectRef= useRef([]);
  const listIdRowSelectRef = useRef([]);
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [formBank] = Form.useForm();
  const [formDate] = Form.useForm();
  //render list object

  const renderListObject = (list) => {
    return list.map(value => {
      return (
        <Option value={value?.id} key={value?.code}>{value?.name}</Option>
      )
    })
  }
  //Get data of table
  useEffect(() => {
    if(!_.isEmpty(data)) {
      const result = data.reduce((arr,value) => {
          if(value.bank_account != "") {
            return arr.concat({text: value.bank_account, value: value.bank_account})
          } else return arr.concat({text: "Khác", value: ""});
      },[])
    //   const kindLabel = data.reduce((arr,value) => {
    //     if(value.kind_label != "") {
    //       return arr.concat({text: value.kind_label, value: value.kind})
    //     } else return arr.concat({text: "Khác", value: ""});
    // },[])
    //   setKind_label(Array.from(new Set(kindLabel.map(JSON.stringify))).map(JSON.parse))
      setBank_account(Array.from(new Set(result.map(JSON.stringify))).map(JSON.parse));
    }
  },[data])

  useEffect(() => {
    GetListTransaction({page: 1,per_page: 10});
    getListBank();
  },[])

  const renderOption = (data) =>{
    return(
      data.map((value)=>{
        return(
          <Option value={value.id}>{value?.bank_account_full_label}</Option>
        );
      })
    );
  }



  const getListBank = async ()=>{
    dispatch(await action_getListBank())
  }

  const  GetListTransaction =  async (urlFormData) => {
    setLoading(true);
    const result = await dispatch(await action_getListTransaction({...formData.current,...urlFormData}));
    setLoading(false);
    if(result) {
      formData.current = {...formData.current,...urlFormData};
    }
  };
  //SEARCH

  //tim doi tuong gui
  const handleSearcSenderLabel = (values) => {
    GetListTransaction(values);

  }
  //tim doi tuong nhan
  const handleSearchReceiveLabel = (value) => {
    GetListTransaction(value)
  }
  //tim theo ma phieu ghi
  const handleSearchByCode = (value) => {
    const formData = {...value,...{page: pagination?.current_page,per_page: pagination?.per_page}}
    GetListTransaction(formData);
  }

  //tim theo ma chung tu
  const handleSearchByLicense = (value) => {
    const formData = {...value,...{page: pagination?.current_page,per_page: pagination?.per_page}}
    GetListTransaction(formData);
  }

  //tim theo ngan hang
  const handleSearchByBankId = (BankAccountId) => {
    const formData = {page: pagination?.current_page,per_page: pagination?.per_page,"bank_account_id": BankAccountId}
    GetListTransaction(formData);
  }

  //tim theo thoi gian
  const handleSearchByDate = (value) => {

      const formData = {
        "start_date": !_.isEmpty(value) ?moment(value[0]._d).format(dateFormatFormData):null,
        "end_date": !_.isEmpty(value) ?moment(value[1]._d).format(dateFormatFormData):null,
      }
      GetListTransaction({...formData,...{page: pagination?.current_page,per_page: pagination?.per_page}})

  }
    const columns = [
        {
            title: 'Thời gian',
            width: 151,
            dataIndex: 'created_at',
            sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()

        },
        {
            title: 'Người tạo',
            // with: 226,
            dataIndex: ["object", "name"],
            key: "name"
        },
        {
            title: 'Mã phiếu ghi',
            // width: 128,
            dataIndex: 'code',
            // key: "code",
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                  <Form
                      name="basic"
                      onFinish={handleSearchByCode}
                      autoComplete="off"
                      form={form2}
                  >
                      <Form.Item name="code" style={{width: 164,marginLeft: "auto"}}>
                        <Input  suffix={<SearchOutlined/>} placeholder="Tìm chính xác"/>
                      </Form.Item>

                  <Form.Item style={{padding: '8px 0 0 0'}}>
                    <Row justify="space-between" align="middle" style={{margin:"10px 0 0 0"}}>
                      <Col span={10}>
                        <Button type="primary" htmlType="submit">Áp dụng</Button>
                      </Col>
                      <Col span={10} >
                        <Button style={{float: 'right'}} onClick={() => {
                          form2.resetFields();
                          GetListTransaction({code: null});
                        }}>Xóa</Button>
                      </Col>
                    </Row>
                  </Form.Item>

                  </Form>
                </div>
              ),
            filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),

        },
        {
            title: 'Chi tiết',
            // width: 136,
            dataIndex: 'kind_label',
            key: "kind",
            filters: kind_label,
            onFilter: (value, record) => record.kind == (value),
        },
        {
            title: 'Đối tượng gửi',
            // width: 136,
            dataIndex: 'sender_label',
            // key: "sender_label",
            filterDropdown: () => (
                <div style={{ padding: "8px 8px 9px 8px" ,width: 204  }}>
                  <Form
                      form={form}
                      name="basic"
                      onFinish={handleSearcSenderLabel}
                      autoComplete="off"
                  >
                    <Form.Item name="senderable[type]" style={{color: "black"}}>
                          <Radio.Group style={{display: "flex", flexDirection: "column"}} onChange={async (e)=> {
                              setTypeObecjtSend(e.target.value)
                              const result = await dispatch(await action_searchObjectByType({},e.target.value))
                              result && setListObjectSend(result?.data)
                          }}>
                              <Radio value={4}>Công ty</Radio>
                              <Radio value={1}>Khách hàng</Radio>
                              <Radio value={2}>Chi nhánh</Radio>
                              <Radio value={3}>Nhà cung cấp</Radio>
                          </Radio.Group>
                    </Form.Item >
                    {typeObjectSend != 4 &&
                    <>
                    <Form.Item name="senderable[id]" className='select_send_receive'  style={{width: 164}}>
                        <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Tìm kiếm..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {renderListObject(listObjectSend)}
                        </Select>
                      </Form.Item>

                      <Form.Item style={{paddingTop: '15px'}}>
                        <Row align="middle" justify="space-between">
                          <Col span={10}>
                            <Button type="primary" htmlType="submit" >Áp dụng</Button>
                          </Col>
                          <Col span={10}>
                            <Button style={{width: '100%'}} onClick={() => {
                                GetListTransaction({"senderable[id]": null, "senderable[type]": null});
                                form.resetFields();
                                setListObjectSend([]);
                            }}>Hủy</Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </>

                    }




                  </Form>
                </div>
              ),
            filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            render: (text, record) =>  <Popover title={text} content={
              <Row>
                <Col span={10}>{record.kind == 1 ? "Chuyển quỹ về" : record.kind == 2 ? "COD" : record.kind == 3 ? "Trả góp" : record.kind == 4 ? "Quẹt thẻ" : record.kind == 5 ? "Chuyển khoản" : record.kind == 6 ? "Chi cọc hoàn" : record.kind == 7 ? "Chi trả công nợ" : record.kind == 8 ? "Chi hoàn tiền hóa đơn" : record.kind == 9 ? "Chi trả lương" : record.kind == 10 ? "Thu tiền mặt" : "Cổng thanh toán" }</Col>
                <Col span={14}><Paragraph copyable >{record.amount_label}</Paragraph></Col>
              </Row>

            }>
                {text}
            </Popover>
        },
        {
            title: 'Đối tượng nhận',
            dataIndex: 'receiver_label',
            // key: "receiver_label",
            filterDropdown: () => (
              <div style={{ padding: "8px 8px 9px 8px" ,width: 204  }}>
                <Form
                    form={form1}
                    name="basic"
                    onFinish={handleSearchReceiveLabel}
                    autoComplete="off"
                >
                  <Form.Item name="receiverable[type]" style={{color: "black"}}>
                        <Radio.Group style={{display: "flex", flexDirection: "column"}} onChange={async (e)=> {
                            setTypeObecjtReceive(e.target.value)
                              const result = await dispatch(await action_searchObjectByType({},e.target.value))
                              result && setListObjectReceive(result?.data)
                          }}>
                              <Radio value={4}>Công ty</Radio>
                              <Radio value={1}>Khách hàng</Radio>
                              <Radio value={2}>Chi nhánh</Radio>
                              <Radio value={3}>Nhà cung cấp</Radio>

                        </Radio.Group>
                  </Form.Item >
                  {typeObjectReceive != 4 &&
                  <>
                  <Form.Item name="receiverable[id]" className='select_send_receive' style={{width: 164,marginLeft: "auto", marginTop: '8px'}}>
                        <Select
                              showSearch
                              style={{ width: '100%' }}
                              placeholder="Tìm kiếm..."
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                            {renderListObject(listObjectReceive)}
                          </Select>
                      </Form.Item>

                  <Form.Item style={{padding: '15px 0 0 0'}}>
                      <Row align="middle" justify="space-between">
                        <Col span={10}>
                          <Button type="primary" htmlType="submit" >Áp dụng</Button>
                        </Col>
                        <Col span={10}>
                          <Button style={{width: '100%'}} onClick={() => {
                            GetListTransaction({"receiverable[id]": null, "receiverable[type]": null});
                            form1.resetFields();
                            setListObjectReceive([]);
                          }}>Hủy</Button>
                        </Col>
                      </Row>
                  </Form.Item>
                  </>
                  }

                </Form>
              </div>
            ),
            filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            render: (text, record) => <Popover title={text} content={
              <Row>
                <Col span={10}>{record.kind == 1 ? "Chuyển quỹ về" : record.kind == 2 ? "COD" : record.kind == 3 ? "Trả góp" : record.kind == 4 ? "Quẹt thẻ" : record.kind == 5 ? "Chuyển khoản" : record.kind == 6 ? "Chi cọc hoàn" : record.kind == 7 ? "Chi trả công nợ" : record.kind == 8 ? "Chi hoàn tiền hóa đơn" : record.kind == 9 ? "Chi trả lương" : record.kind == 10 ? "Thu tiền mặt" : "Cổng thanh toán" }</Col>
                <Col span={14}><Paragraph copyable >{record.amount_label}</Paragraph></Col>
              </Row>

            }>
                {text}
            </Popover>
        },
        {
            title: 'Tài khoản ngân hàng',
            dataIndex: 'bank_account',
            key: "bank_account",

            render: (text,record) =>
                <Popover title={text} content={
                  <Row>
                    <Col span={10}>Số dư tài khoản: </Col>
                    <Col span={14}><Paragraph copyable >{record.amount_label}</Paragraph></Col>
                  </Row>

                }>
                    {text}
                </Popover>,

              // )
            // },
            // filters: bank_account,
            // onFilter: (value, record) => record.bank_account.indexOf(value) === 0,
            // valueEnum: {
            //     all: { text: 'Chọn' },
            //   },
        },
        {
            title: 'Giá trị',
            dataIndex: 'amount_label',
            // key: "amount_label",
            sorter: (a, b) => {
              return MapMoneyToNumber(a.amount_label) - MapMoneyToNumber(b.amount_label)
            }
        },
        {
            title: 'Mã chứng từ',
            dataIndex: 'license',
            // key: "license",
            render: (text,record) => <Tooltip placement="topLeft" color={'white'} title={<Paragraph copyable >{text}</Paragraph>}>
                          {text}
                      </Tooltip>,
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                <Form
                      name="basic"
                      onFinish={handleSearchByLicense}
                      autoComplete="off"
                      form={form3}
                  >
                      <Form.Item name="license" style={{width: 164,marginLeft: "auto"}}>
                        <Input  suffix={<SearchOutlined/>} />
                      </Form.Item>

                  <Form.Item style={{padding: '8px 0 0 0'}}>
                    <Row justify="space-between" align="middle">
                        <Col span={10}>
                          <Button type="primary" htmlType="submit">Áp dụng</Button>
                        </Col>
                        <Col span={10} >
                          <Button style={{float: 'right'}} onClick={() => {
                            form3.resetFields();
                            GetListTransaction({license: null});
                          }}>Xóa</Button>
                        </Col>
                      </Row>
                  </Form.Item>
                  </Form>
                </div>
              ),
            filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),

        },
    ];

  const handleSum = (data) => {
    const result = data.reduce((sum, value) => {
      return sum+=value.amount ;
    },0)
    return result;
  }
  //reload tool table

  const handleReloadTable = () => {
    GetListTransaction({per_page: 10,
      page: 1,
      start_date: null,
      end_date: null,
      code: null,
      kind: null,
      'kind_label_req': null,
      'receiverable[type]': null,
      'receiverable[id]': null,
      license: null,
      'senderable[type]': null,
      'senderable[id]': null,
      bank_account_id: null,});
      form.resetFields();
      form1.resetFields();
      form2.resetFields();
      form3.resetFields();
      formBank.resetFields();
      formDate.resetFields();
      setTypeObecjtReceive(0);
      setTypeObecjtSend(0);
  }

  //tao phieu
  const handleCreateFolder = async () => {
    const resultGetObjectDebt = await dispatch(await action_showModalCreateDoc({
        "object[id]": (listRowSelectRef.current[0])?.object?.object_id,
        "object[type]": (listRowSelectRef.current[0]).object?.object_type,
        kind: (listRowSelectRef.current[0]).kind },
      {transaction: listRowSelectRef.current, listBank: dataListBank}));
    resultGetObjectDebt && router.push('yeucauthuchi/taophieu')
  }

  //xoas phieu
  const handleDeletePhieu = async () => {

    const res = await dispatch(await action_deleteTransaction({
      "ids" : listIdRowSelectRef.current,
      "note": "123"
    }))

    if(res) {
      data.filter(item => listRowSelectRef.current.includes(item.id));
      action.reloadAndRest();
      message.success('Xóa thành công.');
    }

}
  return (<>

    <NavBar1 title={"Yêu cầu thu chi"} summarys={summarys} check={true}></NavBar1>
      <Row style={{marginTop: '24px'}}>
        <Col span={20} style={{margin: 'auto', padding: '16px 24px', background: 'white'}}>
          <Row>
            <Col span={24}>
              <Row align='middle'>
                <Col span={6} style={{marginRight: '8px'}}>
                  <Form form={formDate}>
                      <Form.Item name="date">
                      <RangePicker
                        showTime={{ format: 'HH:MM:SS' }}
                        defaultValue={[moment(), moment()]}
                        format={dateFormat}
                        onChange={handleSearchByDate}
                      />
                      </Form.Item>
                  </Form>
                </Col>
                <Col span={3}>
                  <Form form={formBank}>
                      <Form.Item name="bank_account_id">
                        <Select  style={{ width: 395 }} placeholder="Chọn tài khoản ngân hàng"
                          showSearch
                          allowClear
                          onChange={handleSearchByBankId}
                          // value={formData.current.bank_account_id}
                          filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                          }>
                          {renderOption(dataListBank)}
                      </Select>
                      </Form.Item>
                    </Form>
                </Col>

                <Col span={3} style={{marginLeft: 'auto'}}>
                  <ToolTable
                    onReload={handleReloadTable}
                    hideAdd={_.isEmpty(arrRowSelect)}
                    hideDelete={_.isEmpty(arrRowSelect)}
                    onAdd={handleCreateFolder}
                    onDelete={handleDeletePhieu}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{marginBottom: '8px', padding: '16px 0  '}} hidden={_.isEmpty(arrRowSelect)}>
                <Alert message={
                  <Text>
                    <Text strong>Phiếu thu đã chọn:</Text> {_.size(arrRowSelect)}/{_.size(data)}  phiếu = {formatNumber(handleSum(arrRowSelect))}
                  </Text>
                }>

                </Alert>
            </Col>
            <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              onChange={ (pagination, filters, sorter) => {
                  const arrFilter = filters.kind;
                   GetListTransaction({'kind_label_req': arrFilter, page: pagination?.current, per_page: pagination?.pageSize})
              }}
              loading={loading}
              rowKey="id"
              pagination={{
                  total: pagination?.total,
                  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
                  defaultPageSize: 10,
                  // defaultCurrent: 1,
                  current:  pagination?.current_page,
                  pageSizeOptions: [10,20,50],
                //   onChange: (page,pageSize) => {
                //     console.log(page);
                //   GetListTransaction({page, per_page: pageSize});
                // },
              }}

              rowSelection={{
                hideSelectAll: true,
                onSelect: (record,selected, selectedRows, nativeEvent) => {
                    setArrRowSelect(selectedRows);
                    listRowSelectRef.current = selectedRows;
                    if(_.isEmpty(selectedRows)) {
                      setCheck(true)
                      data.map(value => {
                        if(value.id != record.id) value.hidden = false;
                        return value;
                      })
                    } else {
                      setCheck(false)
                      if(record.kind == 1 || record.kind == 5) {
                        data.map(value => {
                          if(value.id != record.id) value.hidden = true;
                          else value.hidden = false;
                          return value;
                        })
                      } else {
                        data.map(value => {
                          if(value.senderable_id == record.senderable_id &&
                            value.receiverable_id == record.receiverable_id &&
                            value.kind == record.kind
                            ) value.hidden = false;
                            else value.hidden = true;
                          return value;

                        })
                      }
                    }
                    },
                    onChange: (key) => {
                      listIdRowSelectRef.current = key;
                    },
                  renderCell: (checked, record, index, originNode) => {
                    if(!record.hidden) return originNode;

                  },
              }}
          />
            </Col>

          </Row>

        </Col>
      </Row>
  </>);
};

export default RequestPaymentComponent;
