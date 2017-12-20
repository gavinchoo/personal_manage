import React from 'react'
import moment from 'moment'

import '../stylesheets/personlist.less'
import '../stylesheets/tables.less'

import {getAllPersonal, delPersonal} from '../../actions/personal'

import {Row, Col, Input, Button, Pagination, Modal, Radio} from 'antd'

const RadioGroup = Radio.Group

class PersonItem extends React.Component {
    constructor(...args) {
        super(...args)
    }

    handlerDelete(evt) {
        this.props.removePersonItem(this.props.item._id);
    }

    //detail
    handlerDetail(evt) {
        this.props.detailPersonItem(this.props.item);
    }

    render() {
        return (
          <tr>
              <td>{this.props.item.town}</td>
              <td>{this.props.item.village}</td>
              <td>{this.props.item.name}</td>
              <td>{this.props.item.sex}</td>
              <td>{moment(this.props.item.birthday, 'YYYY').fromNow().replace(/[^0-9]/ig, "")}</td>
              <td>{this.props.item.duties}</td>
              <td>{this.props.item.officeYear}</td>
              <td>{this.props.item.mobile}</td>

              <td className='itemTd'>
                  <a className="itemBtn" onClick={this.handlerDelete.bind(this)}>删除</a>
                  <a className="itemBtn" onClick={this.handlerDetail.bind(this)}>详情</a>
              </td>
          </tr>
        )
    }
}

class PersonDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div className="detail_container">
              <label className="detail_text_lable">基本信息</label>
              <div className="form-inline base-info">
                  <div className="form-group">
                      <label>姓名：</label>
                      <label type="text" name="name">{this.props.item.name}</label>
                  </div>
                  <div className="form-group">
                      <label>性别：</label>
                      <RadioGroup disabled={true} name="sex" defaultValue={1}>
                          <Radio value={1}>男</Radio>
                          <Radio value={0}>女</Radio>
                      </RadioGroup>
                  </div>
                  <div className="form-group">
                      <label>出生年月：</label>
                      <label>{moment(this.props.item.birthday).format('YYYY-MM-DD')}</label>
                  </div>
              </div>
              <label className="text_lable">任职信息</label>

              <div className="base-info">
                  <div className="form-inline">
                      <div className="form-group">
                          <label>乡镇：</label>
                          <label type="text" text={this.props.item.village} name="village"/>
                      </div>
                      <div className="form-group">
                          <label>所在村：</label>
                          <label type="text" name="town">{this.props.item.town}</label>
                      </div>
                      <div className="form-group">
                          <label>任职日期：</label>
                      </div>
                  </div>
                  <div className="form-inline">
                      <div className="form-group">
                          <label>职务：</label>
                          <label type="text"></label>
                      </div>
                      <div className="form-group">
                          <label>工资：</label>
                          <label type="text"></label>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

class PersonList extends React.Component {
    constructor(...args) {
        super(...args)
    }

    render() {
        var result = []
        if (this.props.persons.length > 0) {
            this.props.persons.forEach(item => {
                result.push(<PersonItem key={item.id} item={item} removePersonItem={this.props.removePersonItem}
                                        detailPersonItem={this.props.detailPersonItem}/>)
            })
        }
        return (
          <tbody>{result}</tbody>
        )
    }
}

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSearchChange = (e) => {
        if (e.target.value.length > 0) {
            const newState = {}
            newState[e.target.name] = e.target.value
            this.setState(newState)
        } else {
            delete this.state[e.target.name]
        }
    }

    handleSearch = (e) => {
        this.props.handleSearch(this.state)
    }

    render() {
        return (
          <Row className="index_search">
              <Col xs={24} lg={18}>
                  <Row type="flex" gutter={16} className="index_search_content">
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>姓名：</label>
                          <Input type="text" name="name" onChange={this.handleSearchChange}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>职务：</label>
                          <Input type="text" name="role" onChange={this.handleSearchChange}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>任职年限：</label>
                          <Input type="text" name="officeYear" onChange={this.handleSearchChange}/>
                      </Col>

                      <Col xs={24} lg={8} className="gutter-box">
                          <label>乡镇：</label>
                          <Input type="text" name="village" onChange={this.handleSearchChange}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>所在村：</label>
                          <Input type="text" name="town" onChange={this.handleSearchChange}/>
                      </Col>
                      <Col xs={24} lg={8} className="gutter-box">
                          <label>联系电话：</label>
                          <Input type="text" name="mobile" onChange={this.handleSearchChange}/>
                      </Col>
                  </Row>
              </Col>
              <Col xs={24} lg={6}>
                  <div className="personlist_btn_parent">
                      <Button type="primary" onClick={this.handleSearch} className="submitbtn">查询</Button>
                      <Button type="primary" className="submitbtn personlist_btn_parent_reset">重置</Button>
                  </div>
              </Col>
          </Row>
        )
    }
}

class MyTextCell extends React.Component {
    //渲染组件
    render() {
        const {rowIndex, field, data, ...prop} = this.props;
        return (
          <Cell {...prop}>
              <span className='cellColor'>{data[rowIndex][field]}</span>
          </Cell>
        );
    }
}

class Person extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetail: false,
            itemDetail: {},
            totalcount: 0,
            pagesize: 10,
            persons: [],
            params: '',
        }
    }

    componentWillMount() {
        this.queryPerson(1)
    }

    queryPerson(page) {
        getAllPersonal({
            props: this.props,
            body: {
                page: page,
                pagesize: this.state.pagesize,
                params: this.state.params
            },
            success: (result) => {
                this.setState({
                    totalcount: result.total,
                    persons: result.data
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    removePersonItem(key) {
        console.log(key)
        delPersonal({
            props: this.props,
            body: {'key': key},
            success: (result) => {
                if (result.status == 100) {
                    this.removeLocalPerson(key)
                }
            },
            error: (message) => {
                alert('删除失败,' + message)
            }
        })
    }

    removeLocalPerson(key) {
        for (var index = 0; index < this.state.persons.length; index++) {
            if (this.state.persons[index]._id == key) {
                this.state.persons.splice(index, 1)
                break
            }
        }
        this.setState({
            persons: this.state.persons
        })
    }

    detailPersonItem(item) {
        console.log(item)
        this.setState({
            isShowDetail: true,
            itemDetail: item
        })
    }

    handlePageChange = (page, pageSize) => {
        console.log(page)
        console.log(pageSize)
        this.queryPerson(page)
    }

    handleOk = () => {
        this.setState({
            isShowDetail: false
        })
    }

    handleCancel = () => {
        this.setState({
            isShowDetail: false
        })
    }

    handleSearch = (params) => {
        console.log(params)
        this.state.params = params
        this.queryPerson(1)
    }

    render() {
        return (
          <div className="index_body">
              <Search handleSearch={this.handleSearch}/>
              <div style={{minHeight: 380}}>
                  <table className="table table-bordered table-hover index_table">
                      <thead>
                      <tr>
                          <th>乡镇</th>
                          <th>所在村</th>
                          <th>姓名</th>
                          <th>性别</th>
                          <th>年龄</th>
                          <th>职务</th>
                          <th>任职年限</th>
                          <th>联系电话</th>
                          <th>操作</th>
                      </tr>
                      </thead>
                      <PersonList persons={this.state.persons} removePersonItem={this.removePersonItem.bind(this)}
                                  detailPersonItem={this.detailPersonItem.bind(this)}/>
                  </table>
              </div>
              <label className="index_data_empty" style={{'display': (this.state.totalcount == 0) ? 'block' : 'none'}}>暂无数据</label>
              <div className="personlist_page">
                  <Pagination style={{'display': (this.state.totalcount == 0) ? 'none' : 'block'}}
                              defaultCurrent={1}
                              total={this.state.totalcount}
                              onChange={this.handlePageChange}/>
              </div>

              <Modal visible={this.state.isShowDetail} footer={[
                  <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
                      关闭
                  </Button>
              ]} onCancel={this.handleCancel} closable={false}>
                  <PersonDetail item={this.state.itemDetail}/>
              </Modal>
          </div>
        )
    }
}

export default Person