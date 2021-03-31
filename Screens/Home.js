import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import categoriesData from './data';
import {Svg} from 'react-native-svg';
import {VictoryPie} from 'victory-native';
import {COLORS, FONTS, SIZES, icons, images} from './../Constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import icon from '../Constants/icon';
export default function Home() {
  const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current

  const [categories, setCategories] = useState(categoriesData);
  const [viewMode, setViewMode] = useState('chart');
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showMoreToggle, setShowMoreToggle] = useState(false)

  function RandersNavBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', width: 50}}
          onPress={() => console.log('Go Back')}>
          <Image
            source={icons.back_arrow}
            style={{height: 30, width: 30, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'flex-end', width: 50}}
          onPress={() => console.log('More')}>
          <Image
            source={icons.more}
            style={{height: 30, width: 30, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function RendersHeader() {
    return (
      <View style={{padding: SIZES.padding, backgroundColor: COLORS.white}}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>My Expanses</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
            Summery (private)
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.calendar}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>
          <View style={{marginLeft: SIZES.padding}}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>
              07 Feb, 2021
            </Text>
            <Text style={{color: COLORS.darkgray, ...FONTS.body3}}>
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function RandersCatSec() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: SIZES.padding,
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>Categories</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
            {categories.length} Total
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              marginLeft: SIZES.base,
              backgroundColor: viewMode === 'chart' ? COLORS.secondary : null,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={() => setViewMode('chart')}>
            <Image
              source={icons.chart}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor:
                  viewMode === 'chart' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              marginLeft: SIZES.base,
              backgroundColor: viewMode === 'list' ? COLORS.secondary : null,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
            onPress={() => setViewMode('list')}>
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: viewMode === 'list' ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function RandersCategoryList() {
    const renterItem = ({item}) => {
      return (
        <TouchableOpacity
        onPress={()=>setSelectedCategory(item)}
          style={{
            flexDirection: 'row',
            flex: 1,
            margin: 5,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}>
          <Image
            source={item.icon}
            style={{
              width: 20,
              height: 20,
              tintColor: item.color,
            }}
          />
          <Text style={{marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{paddingHorizontal: SIZES.padding - 5 }}>
       <Animated.View style={{ height: categoryListHeightAnimationValue }}>
        <FlatList
          data={categories}
          renderItem={renterItem}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
        />
        </Animated.View>
        <TouchableOpacity style={{
            flexDirection:'row',
            justifyContent:'center',

        }}
        onPress={()=>{
            if (showMoreToggle) {
                Animated.timing(categoryListHeightAnimationValue,{
                    toValue:115,
                    duration:500,
                    useNativeDriver:false
                }).start()
            } else {
                Animated.timing(categoryListHeightAnimationValue,{
                    toValue:172.5,
                    duration:500,
                    useNativeDriver:false
                }).start()
            }
            setShowMoreToggle(!showMoreToggle)}}
        >
            <Text style={{...FONTS.body4 }}>{showMoreToggle?"Less":"More"}</Text>
            <Image source={showMoreToggle? icons.up_arrow:icons.down_arrow} 
            style={{
                height:20,
                width:20,
                marginLeft: 5,alignSelf:'center'
            }} />
        </TouchableOpacity>
      </View>
    );
  }

  function IncomingExpansesTitle(){
    return(
      <View style={{padding:SIZES.padding,height: 80, backgroundColor: COLORS.lightGray2}}>
        <Text style={{color:COLORS.primary,...FONTS.h2}} >Incoming Expanses</Text>
        <Text style={{color:COLORS.darkgray,...FONTS.body3}}>12 Total</Text>
      </View>

    )
  }
  
function renderIncomingExpenses(){
  let allExpenses = selectedCategory ? selectedCategory.expenses : []
        let incomingExpenses = allExpenses.filter(a => a.status == "P")
        const renderItem = ({ item, index }) => (
          <View style={{
              width: 300,
              marginRight: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : 0,
              marginVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              ...styles.shadow
          }}>
              {/* Title */}
              <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                  <View
                      style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          backgroundColor: COLORS.lightGray,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: SIZES.base
                      }}
                  >
                      <Image
                          source={selectedCategory.icon}
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: selectedCategory.color
                          }}
                      />
                  </View>

                  <Text style={{ ...FONTS.h3, color: selectedCategory.color, }}>{selectedCategory.name}</Text>
              </View>

              {/* Expense Description */}
              <View style={{ paddingHorizontal: SIZES.padding }}>
                  {/* Title and description */}
                  <Text style={{ ...FONTS.h2, }}>{item.title}</Text>
                  <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                      {item.description}
                  </Text>

                  {/* Location */}
                  <Text style={{ marginTop: SIZES.padding, ...FONTS.h4, }}>Location</Text>
                  <View style={{ flexDirection: 'row' }}>
                      <Image
                          source={icons.pin}
                          style={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.darkgray,
                              marginRight: 5
                          }}
                      />
                      <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body4 }}>{item.location}</Text>
                  </View>
              </View>

              {/* Price */}
              <TouchableOpacity
                  style={{
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomStartRadius: SIZES.radius,
                      borderBottomEndRadius: SIZES.radius,
                      backgroundColor: selectedCategory.color,
                  }}
              >
                  <Text style={{ color: COLORS.white, ...FONTS.body3 }}>CONFIRM {item.total.toFixed(2)} USD</Text>
              </TouchableOpacity>
          </View>
      )
  return(
    <View>
      {IncomingExpansesTitle()}
    {incomingExpenses.length > 0 &&<FlatList
    data={incomingExpenses}
    renderItem={renderItem}
    keyExtractor={item=>`${item.id}`}
    horizontal
    showsHorizontalScrollIndicator={true}
      />}
       {
                    incomingExpenses.length == 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>No Record</Text>
                    </View>
                }
    </View>
  )
}

  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
      {/* navigation Bar */}
      {RandersNavBar()}
      {/* header  */}
      {RendersHeader()}
      <ScrollView>
      {RandersCatSec()}

      {
        
                    viewMode == "list" &&
                    <View>
                        {RandersCategoryList()}
                        {renderIncomingExpenses()}
                    </View>
                
      }</ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
