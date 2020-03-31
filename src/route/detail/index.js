import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import { useDispatch } from "react-redux";
import "../../less/detail.less";
import axios from "../../axios/index";
import CatalogList from "../../component/List";
import { Slider, Icon, NavBar, Popover, Toast } from "antd-mobile";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
//小说主体内容
function Fiction({
  url,
  styles,
  fontSize,
  onClick,
  initializeComponent,
  setShowTop,
  history,
  match
}) {
  const { id, cataLog } = match.params;
  const [fictionContent, setContent] = useState("");
  const [smallCatalog, setCatalog] = useState("");
  const [next, setNext] = useState(1);
  const detailRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    Toast.loading("Loading...", 5);
    axios.get(`/novel/` + url).then(data => {
      dispatch({
        type: "ADD_READ",
        data: {
          ...data,
          content: undefined
        }
      });
      setCatalog(data.chapter_name);
      setContent(data.content);
      setNext(data.next);
      Toast.hide();
      setShowTop();
      if (detailRef.current) {
        detailRef.current.scrollTop = 0;
      }
    });
  }, [url, initializeComponent, setShowTop]);
  return (
    <div className="fictionContentParent" ref={detailRef}>
      <div className="small-catalog">{smallCatalog}</div>
      <div
        dangerouslySetInnerHTML={{ __html: fictionContent }}
        className="fictionContent"
        style={{ ...styles, fontSize: fontSize + "px" }}
        onClick={e => {
          onClick(e);
        }}
      ></div>
      <div className="next-btn">
        <span
          onClick={() => {
            if (cataLog > 1) {
              history.push(`/detail/${id}/${Number(cataLog) - 1}`);
            } else {
            }
          }}
        >
          上一页
        </span>
        <span
          onClick={() => {
            if (next) {
              history.push(`/detail/${id}/${Number(cataLog) + 1}`);
            } else {
              Toast.info("已是最新章节！", 2);
            }
          }}
        >
          下一页
        </span>
      </div>
    </div>
  );
}
//阅读小数头部
function FictionTop({ showTop, history, currentInfo, match }) {
  const [popoverShow, setPopover] = useState(false);
  const bookrack = useSelector(state => state.bookrack);
  const bookId = match.params.id;
  const dispatch = useDispatch();
  const title = currentInfo.title;
  const isInclude = bookrack.find(item => {
    return item.id === bookId;
  });
  const [name, setName] = useState(isInclude ? "取消加入" : "加入书架");
  return (
    <CSSTransition
      in={showTop}
      // unmountOnExit
      timeout={100}
      appear={true}
      classNames="down"
      onExit={() => {
        setPopover(false);
      }}
    >
      <NavBar
        mode="light"
        icon={
          <Icon
            type="left"
            style={{ zIndex: 10, position: "relative" }}
            onClick={() => {
              history.goBack();
            }}
          />
        }
        onLeftClick={() => {}}
        rightContent={
          <Popover
            overlayClassName="fortest"
            overlayStyle={{ color: "currentColor" }}
            visible={popoverShow}
            overlay={[
              <Popover.Item key="1">首页</Popover.Item>,
              <Popover.Item key="2">
                <div
                  onClick={() => {
                    if (isInclude) {
                      dispatch({
                        type: "DEL_BOOKRACK",
                        data: isInclude
                      });
                      Toast.info("取消成功", 2);
                      setName("加入书架");
                    } else {
                      dispatch({
                        type: "ADD_BOOKRACK",
                        data: currentInfo
                      });
                      Toast.info("加入成功", 2);
                      setName("取消加入");
                    }
                  }}
                >
                  {name}
                </div>
              </Popover.Item>
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0]
            }}
            onSelect={e => {
              if (e.key === "1") {
                history.push("/");
              }
            }}
          >
            <div
              style={{
                height: "100%",
                padding: "0 15px",
                marginRight: "-15px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Icon
                type="ellipsis"
                onClick={() => {
                  setPopover(!popoverShow);
                }}
              />
            </div>
          </Popover>
        }
      >
        {title}
      </NavBar>
    </CSSTransition>
  );
}
//阅读小说底部操作
function FictionFooter(props) {
  const { changeFontSize, showTop, setDrawer } = props;
  const [font, setFont] = useState(false);
  useEffect(() => {
    if (!showTop) setFont(false);
  }, [showTop]);
  return (
    <div className="fiction-footer">
      {<SetFontSize changeFontSize={changeFontSize} isShow={font} />}
      <CSSTransition
        in={showTop}
        unmountOnExit
        timeout={100}
        appear={true}
        classNames="up"
      >
        <nav>
          <div
            onClick={() => {
              setDrawer();
            }}
          >
            <i className="iconfont icon-daohang"></i>
            <span>目录</span>
          </div>
          <div
            onClick={() => {
              setFont(!font);
            }}
          >
            <i className="iconfont icon-ziti"></i>
            <span>设置</span>
          </div>
          <div>
            <i className="iconfont icon-yejian"></i>
            <span> 夜间</span>
          </div>
        </nav>
      </CSSTransition>
    </div>
  );
}
//设置字体
function SetFontSize({ changeFontSize, isShow }) {
  return (
    <div
      className="set-font-size"
      style={{ display: isShow ? "flex" : "none" }}
    >
      <i className="iconfont icon-ziti-"></i>
      <Slider
        // style={{ marginLeft: 30, marginRight: 30 }}
        defaultValue={1}
        min={0}
        max={20}
        trackStyle={{
          height: "3px"
        }}
        railStyle={{
          height: "3px"
        }}
        onChange={size => {
          changeFontSize(size);
        }}
      />
      <i className="iconfont icon-ziti1"></i>
    </div>
  );
}
//抽屉组件
function Drawer(props) {
  const { open, hideCatalog, Grounding } = props;
  return (
    <div
      className="drawer-mask"
      style={{ display: open ? "block" : "none" }}
      onClick={hideCatalog}
    >
      <CSSTransition
        in={open}
        // unmountOnExit
        timeout={200}
        appear={true}
        classNames="right"
      >
        <div
          className="drawer"
          onScrollCapture={e => {
            if (
              e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
              e.currentTarget.scrollHeight - 50
            ) {
              var timer = "";
              clearTimeout(timer);
              timer = setTimeout(() => {
                Grounding && Grounding(e);
              }, 500);
            }
          }}
        >
          {props.children}
        </div>
      </CSSTransition>
    </div>
  );
}
export default function Detail(props) {
  const id = props.match.params.id;
  const url = id + "/" + props.match.params.cataLog;
  const [fontSize, setSize] = useState(14);
  const [showTop, setTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [listData, setData] = useState([]);
  const [allCatalog, setAllCatalog] = useState([]);
  const [scrollStart, setStart] = useState(1);
  const [currentInfo, setCurrentInfo] = useState("");
  useEffect(() => {
    axios.get(`novel/${id}`).then(data => {
      debugger;
      if (data.code !== 0) return Toast.info("数据加载失败", 2);
      setAllCatalog(data.chapterList);
      setData(data.chapterList.slice(0, 40));
      setStart(scrollStart => scrollStart + 1);
      setCurrentInfo(data.data);
    });
  }, [id]);
  return (
    <div className="detail" style={{ overflow: open ? "hidden" : "scroll" }}>
      <FictionTop showTop={showTop} {...props} currentInfo={currentInfo} />
      <Fiction
        {...props}
        url={url}
        fontSize={fontSize}
        onClick={e => {
          setTop(!showTop);
        }}
        setShowTop={useCallback(() => setTop(false), [])}
      />
      <FictionFooter
        showTop={showTop}
        changeFontSize={size => {
          setSize(12 + 2 * size);
        }}
        setDrawer={() => {
          setOpen(true);
        }}
      />
      <Drawer
        open={open}
        hideCatalog={() => {
          setOpen(false);
        }}
        Grounding={e => {
          const data = allCatalog.slice(0, scrollStart * 40 + 40);
          setData(data);
          setStart(scrollStart + 1);
        }}
      >
        <div className="catalog">
          目录{" "}
          <span
            className="toggle-order"
            onClick={e => {
              setAllCatalog(allCatalog.reverse());
              setStart(0);
              const data = allCatalog.slice(0, 40);
              setData(data);
              e.stopPropagation();
            }}
          >
            倒序
          </span>
        </div>
        <div className="catalog-list">
          <CatalogList data={listData} jump={true} />
        </div>
      </Drawer>
    </div>
  );
}
