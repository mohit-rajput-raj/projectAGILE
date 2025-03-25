import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../Store/AuthStore'
import { useDashBoardStore } from '../Store/dashBoardStore'
import { BlankItemsCard, ItemsCard } from "../components/ItemsCard";
const OrderDetailsPage = () => {
  const orderId = useParams().orderId;
  console.log(orderId);
  const {getOrder,getOrderLoading,order} = useDashBoardStore();
  useEffect(() => {
    getOrder(orderId);
  }, [getOrder]);
  console.log(order);
  
  
  if(getOrderLoading )return <div> loading</div>
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1 flex-col">
          <main className="coMain">
            <aside className="coLeft">
              <div className="coLeftTop">
                <header className="flex justify-between items-center cltH">
                  <h2 className="text-3xl">Order Id : {order?.orderId || "Loading"}</h2>
                  <div>
                    <h4 className="text-xl">Order Date : {order?.createdAt || "Loading"}</h4>
                    <span>Email: {order?.orderBuilder?.email || "Loading"}</span>
                  </div>
                </header>
              </div>
              <div className="coLeftBottom">
                <div>
                  
                  <form className="flex flex-col coForm">
                    <div className="coIPar">
                      <label htmlFor="caption">Caption</label>
                      <input
                        type="text"
                        name="caption"
                        value={order?.caption || ""}
                        placeholder={order?.caption || "Loading"}
                        className="coInput"
                      />
                    </div>
                    <div className="description max-h-40 coIPar overflow-y-scroll">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        value={order?.description || ""}
                        placeholder={order?.description || "Loading"}
                        className="coInput center"
                      ></textarea>
                    </div>
                    <div className="coIPar">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={order?.address || ""}
                        placeholder={order?.address || "Loading"}
                        className="coInput"
                      />
                    </div>
                    <div className="coIPar w-1/2">
                      <label htmlFor="budget">Budget</label>
                      <input
                        type="number"
                        name="budget"
                        value={order?.budget || ""}
                        placeholder={order?.budget || "Loading"}
                        className="coInput"
                      />
                      <p>(Rupee)</p>
                    </div>
                    <div className="flex">
                      <div className="coIPar">
                        <label htmlFor="deadline">Deadline</label>
                        <input
                          type="text"
                          name="deadLine"
                          value={order?.deadLine || ""}
                          placeholder={order?.deadLine || "Loading"}
                        />
                      </div>
                      <div className="coIPar">
                        <label htmlFor="caption">KEY</label>
                        <span>{order?.orderKey || "Loading"}</span>
                        
                      </div>
                    </div>
                    <div
                      className="flex gap-4 items-center h-100 bg-gray-100 rounded-2xl"
                      style={{ padding: "10px" }}
                    >
                      
                      <div className="flex overflow-x-scroll h-90 gap-4 bg-transparent">
                        {order?.orderItems?.map((item) => (
                          <div key={item.id} className="rounded-2xl h-full">
                            <ItemsCard CardData={item}  />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="additions">
                      <h2 className="text-2xl bold"></h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos hic nostrum repudiandae dicta repellat eius quod
                        consequatur expedita, enim sunt totam, odit quas
                        architecto delectus nulla maiores dolore similique.
                        Eligendi. Nostrum omnis, repellat molestias dolore eius
                        ipsa blanditiis quibusdam ad eaque dicta consequatur
                        fugiat repudiandae aliquid voluptates, laboriosam ullam
                        nesciunt temporibus quae accusantium! Eos similique
                        pariatur distinctio fugit vitae alias. Modi est architecto
                        hic? Id aliquid quidem tempore, facilis minus, minima
                        earum nemo quaerat explicabo maxime ea vero reiciendis
                        modi incidunt! Ex odio distinctio quasi doloremque vitae
                        illo quos enim? Reiciendis, voluptate doloremque. Et culpa
                        eaque, sint unde in ad sunt suscipit voluptate iusto
                        laboriosam voluptatem dolores? Quae voluptatem deleniti
                        et, tempora vitae officia repellat veniam laborum, quasi,
                        cupiditate sed? Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Pariatur, quod facere cum ab eligendi
                        deleniti voluptas voluptates aliquam velit nemo debitis
                        modi similique perferendis beatae. Quia maiores
                        consequuntur quis facilis. Sint dolorum optio voluptate
                        possimus, incidunt iure. Placeat perspiciatis et vitae
                        ipsam earum adipisci, aspernatur nobis illo fugit dolorum
                        quos. Ex sit eius repellendus similique molestiae nesciunt
                        minima ipsum molestias. Recusandae ipsa dolor aliquam
                        optio? Tenetur explicabo quod sit voluptate laborum harum
                        suscipit ut voluptates, debitis, dolores tempora corporis
                        porro? Possimus quia neque quo nulla mollitia laudantium
                        provident suscipit laborum.
                      </p>
                    </div>
                    

                  </form>
                </div>
              </div>
            </aside>
            <aside className="coRight">
              <div className="coRightTop"></div>
              <div className="coRightBottom"></div>
            </aside>
          </main>
          <footer className="w-full bg-zinc-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At a aspernatur laboriosam iste quasi atque. Consectetur omnis autem aliquam hic et voluptatem aut modi, nostrum impedit deserunt, doloremque, commodi est!
            Libero, rerum placeat dicta pariatur laboriosam officia quas nam expedita aliquam fuga culpa? Nobis, ratione tempore. Impedit itaque adipisci voluptatum id ipsum. Quasi doloremque accusantium non, earum incidunt ex eaque.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage